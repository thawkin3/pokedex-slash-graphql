import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import { updatePokemonCapturedStatus } from './graphQLUtils'

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  pokemonIdNumber: {
    fontSize: 14,
    marginBottom: theme.spacing(4),
  },
  avatar: {
    height: theme.spacing(16),
    borderRadius: 0,
    marginBottom: theme.spacing(1),
  },
  cardActions: {
    justifyContent: 'center',
  },
}))

export function PokemonCard({ pokemon, imgUrl }) {
  const classes = useStyles()

  const [isCaptured, setIsCaptured] = useState(pokemon.captured)

  const handleCapturedChange = async () => {
    const { errors, data } = await updatePokemonCapturedStatus(
      pokemon.id,
      !isCaptured
    )

    if (errors) {
      console.error(errors)
    }

    setIsCaptured(data.updatePokemon.pokemon[0].captured)
  }

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography
          className={classes.pokemonIdNumber}
          color="textSecondary"
          gutterBottom
        >
          {pokemon.id}
        </Typography>
        <img alt={pokemon.name} src={imgUrl} className={classes.avatar} />
        <Typography variant="h5" component="h2">
          {pokemon.name}
        </Typography>
        <Typography color="textSecondary">
          {pokemon.pokemonTypes.join(', ')}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <FormControlLabel
          control={
            <Switch
              checked={isCaptured}
              onChange={handleCapturedChange}
              name="captured"
              color="primary"
            />
          }
          label="Captured"
        />
      </CardActions>
    </Card>
  )
}
