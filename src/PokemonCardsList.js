import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { PokemonCard } from './PokemonCard'
import { fetchAllPokemon } from './graphQLUtils'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}))

export function PokemonCardsList() {
  const classes = useStyles()
  const [pokedexData, setPokedexData] = React.useState([])

  React.useEffect(() => {
    const fetchData = async () => {
      const { errors, data } = await fetchAllPokemon()

      if (errors) {
        console.error(errors)
      }

      const result = data.queryPokemon.sort(
        (pokemonA, pokemonB) => pokemonA.id - pokemonB.id
      )
      setPokedexData(result)
    }

    fetchData()
  }, [])

  return (
    <Grid container className={classes.root} spacing={2}>
      {pokedexData.length > 0 &&
        pokedexData.map((pokemon) => (
          <Grid key={pokemon.name} item xs={12} sm={6} md={4} lg={3}>
            <PokemonCard pokemon={pokemon} imgUrl={pokemon.imgUrl} />
          </Grid>
        ))}
    </Grid>
  )
}
