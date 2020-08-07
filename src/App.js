import React from 'react'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Filters } from './Filters'
import { PokemonCardsList } from './PokemonCardsList'
import pokemonLogo from './pokemon-logo.png'

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
  },
  pokemonLogo: {
    maxWidth: '90%',
    width: 400,
  },
}))

function App() {
  const classes = useStyles()

  return (
    <main className={classes.root}>
      <Container>
        <img src={pokemonLogo} alt="" className={classes.pokemonLogo} />
        <Typography variant="srOnly">
          <h1>Pokédex</h1>
        </Typography>
        <Filters />
        <PokemonCardsList />
      </Container>
    </main>
  )
}

export default App
