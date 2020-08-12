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

export function fetchAllPokemon() {
  return fetchGraphQL(fetchAllPokemonOperationsDoc, 'fetchAllPokemon', {})
}

const fetchPokemonOfCertainTypeOperationsDoc = (pokemonType) => `
  query fetchPokemonOfCertainType {
    queryPokemon(filter: { pokemonTypes: { eq: [${pokemonType}] } }) {
      id
      name
      captured
      imgUrl
      pokemonTypes
    }
  }
`

export function fetchPokemonOfCertainType(pokemonType) {
  return fetchGraphQL(
    fetchPokemonOfCertainTypeOperationsDoc(pokemonType),
    'fetchPokemonOfCertainType',
    {}
  )
}

const fetchPokemonByCapturedStatusOperationsDoc = (isCaptured) => `
  query fetchPokemonByCapturedStatus {
    queryPokemon(filter: { captured: ${isCaptured} }) {
      id
      name
      captured
      imgUrl
      pokemonTypes
    }
  }
`

export function fetchPokemonByCapturedStatus(isCaptured) {
  return fetchGraphQL(
    fetchPokemonByCapturedStatusOperationsDoc(isCaptured),
    'fetchPokemonByCapturedStatus',
    {}
  )
}

const fetchPokemonOfCertainTypeAndByCapturedStatusOperationsDoc = ({
  pokemonType,
  isCaptured,
}) => `
  query fetchPokemonOfCertainTypeAndByCapturedStatus {
    queryPokemon(filter: { captured: ${isCaptured}, pokemonTypes: { eq: [${pokemonType}] } }) {
      id
      name
      captured
      imgUrl
      pokemonTypes
    }
  }
`

export function fetchPokemonOfCertainTypeAndByCapturedStatus({
  pokemonType,
  isCaptured,
}) {
  return fetchGraphQL(
    fetchPokemonOfCertainTypeAndByCapturedStatusOperationsDoc({
      pokemonType,
      isCaptured,
    }),
    'fetchPokemonOfCertainTypeAndByCapturedStatus',
    {}
  )
}
