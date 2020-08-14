import React from 'react'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Filters } from './Filters'
import { PokemonCardsList } from './PokemonCardsList'
import pokemonLogo from './pokemon-logo.png'
import {
  fetchAllPokemon,
  fetchPokemonOfCertainType,
  fetchPokemonByCapturedStatus,
  fetchPokemonOfCertainTypeAndByCapturedStatus,
} from './graphQLUtils'

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
  },
  pokemonLogo: {
    maxWidth: '90%',
    width: 400,
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#FFF',
    fontSize: 24,
    textTransform: 'uppercase',
  },
  loadingText: {
    marginTop: theme.spacing(2),
  },
}))

function App() {
  const classes = useStyles()

  const [pokedexData, setPokedexData] = React.useState(null)
  const [pokemonTypeFilter, setPokemonTypeFilter] = React.useState('Any')
  const [capturedFilter, setCapturedFilter] = React.useState('Any')

  React.useEffect(() => {
    const fetchData = async () => {
      if (pokemonTypeFilter !== 'Any' && capturedFilter !== 'Any') {
        const {
          errors,
          data,
        } = await fetchPokemonOfCertainTypeAndByCapturedStatus({
          pokemonType: pokemonTypeFilter,
          isCaptured: capturedFilter === 'Captured',
        })

        if (errors) {
          console.error(errors)
        }

        const result = data.queryPokemon.sort(
          (pokemonA, pokemonB) => pokemonA.id - pokemonB.id
        )
        setPokedexData(result)
      } else if (pokemonTypeFilter !== 'Any') {
        const { errors, data } = await fetchPokemonOfCertainType(
          pokemonTypeFilter
        )

        if (errors) {
          console.error(errors)
        }

        const result = data.queryPokemon.sort(
          (pokemonA, pokemonB) => pokemonA.id - pokemonB.id
        )
        setPokedexData(result)
      } else if (capturedFilter !== 'Any') {
        const { errors, data } = await fetchPokemonByCapturedStatus(
          capturedFilter === 'Captured'
        )

        if (errors) {
          console.error(errors)
        }

        const result = data.queryPokemon.sort(
          (pokemonA, pokemonB) => pokemonA.id - pokemonB.id
        )
        setPokedexData(result)
      } else {
        // Any type, Any captured status
        const { errors, data } = await fetchAllPokemon()

        if (errors) {
          console.error(errors)
        }

        const result = data.queryPokemon.sort(
          (pokemonA, pokemonB) => pokemonA.id - pokemonB.id
        )
        setPokedexData(result)
      }
    }

    fetchData()
  }, [pokemonTypeFilter, capturedFilter])

  return (
    <main className={classes.root}>
      <Container>
        <img src={pokemonLogo} alt="" className={classes.pokemonLogo} />
        <Typography variant="srOnly">
          <h1>Pokémon Pokédex</h1>
        </Typography>
        {pokedexData ? (
          <>
            <Filters
              pokemonTypeFilter={pokemonTypeFilter}
              setPokemonTypeFilter={setPokemonTypeFilter}
              capturedFilter={capturedFilter}
              setCapturedFilter={setCapturedFilter}
            />
            <PokemonCardsList pokedexData={pokedexData} />
          </>
        ) : (
          <div className={classes.loadingContainer}>
            <CircularProgress color="inherit" size={60} />
            <Typography className={classes.loadingText}>Loading</Typography>
          </div>
        )}
      </Container>
    </main>
  )
}

export default App
