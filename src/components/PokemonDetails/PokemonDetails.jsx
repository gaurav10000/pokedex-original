import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import './PokemonDetails.css'


function PokemonDetails() {
  const {id} = useParams()
  const [pokemon, setPokemon] = useState({})
  async function downloadPokemonDetails() {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    console.log(response.data)
    setPokemon({
      id: response.data.id,
      name: response.data.name,
      image: response.data.sprites.other.dream_world.front_default,
      weight: response.data.weight,
      height: response.data.height,
      types: response.data.types.map((t) => t.type.name),

    })
  }

  useEffect(() => {
    downloadPokemonDetails()
  }, [])

  return (
    <div className='pokemon-details-wrapper'>
        <img src={pokemon.image} alt={pokemon.name+"-image"} className="pokemon-image" />
        <div className="pokemon-name xx-large"><span>{`${pokemon.name}`.charAt(0).toUpperCase() + `${pokemon.name}`.slice(1)}</span></div>
        <div className="pokemon-height xx-large">Height: {pokemon.height}</div>
        <div className="pokemon-weight xx-large">Weight: {pokemon.weight}</div>
        <div className="pokemon-details-types"> {pokemon.types && pokemon.types.map((t) => <div key={t}>{t}</div>)}</div>
    </div>
  )
}

export default PokemonDetails