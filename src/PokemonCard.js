import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

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
}))

export function PokemonCard({ pokemon, imgUrl }) {
  const classes = useStyles()

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
        <Typography className={classes.pos} color="textSecondary">
          {pokemon.type.join(', ')}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  )
}
