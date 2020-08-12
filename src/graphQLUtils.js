async function fetchGraphQL(operationsDoc, operationName, variables) {
  const result = await fetch(
    'https://pokedex.us-west-2.aws.cloud.dgraph.io/graphql',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: operationsDoc,
        operationName,
        variables,
      }),
    }
  )

  return await result.json()
}

const fetchAllPokemonOperationsDoc = `
  query fetchAllPokemon {
    queryPokemon {
      id
      name
      captured
      imgUrl
      pokemonTypes
    }
  }
`

const fetchPokemonOfCertainTypeOperationsDoc = (pokemonType) => `
  query fetchPokemonOfCertainType {
    queryPokemon(filter: {pokemonTypes: {eq: [${pokemonType}]}}) {
      id
      name
      captured
      imgUrl
      pokemonTypes
    }
  }
`

export function fetchAllPokemon() {
  return fetchGraphQL(fetchAllPokemonOperationsDoc, 'fetchAllPokemon', {})
}

export function fetchPokemonOfCertainType(pokemonType) {
  return fetchGraphQL(
    fetchPokemonOfCertainTypeOperationsDoc(pokemonType),
    'fetchPokemonOfCertainType',
    {}
  )
}
