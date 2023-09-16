import React, {useEffect, useState} from 'react'
import axios from 'axios'
import './PokemonList.css'
import Pokemon from '../Pokemon/Pokemon';
import Loading from '../Loading/Loading';
function PokemonList() {
    // const POKEDEX_URL = 'https://pokeapi.co/api/v2/pokemon'
    const [pokedexUrl, setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon')
    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [nextUrl, setNextUrl] = useState('');
    const [prevUrl, setPrevUrl] = useState('');
    async function downloadPokemonList() {
        setIsLoading(true)
        const response = await axios.get(pokedexUrl) // this downloads the list of 20 pokemon
        const pokemonResults = response.data.results // we get the array of pokemon from the response
        // console.log(response.data.next);
        setNextUrl(response.data.next)
        setPrevUrl(response.data.previous)
        // iterating over the array of pokemons,  and using their url,  to create an array of promises that will download those 20 pokemons
        const PokemonResultsPromise = pokemonResults.map( (pokemon) => axios.get(pokemon.url))
        // passing that promise array to axios.all to download all the pokemons at once 
        const pokemonData = await axios.all(PokemonResultsPromise) // array of 20 pokemon detailed data
        console.log(pokemonData)
        // iterating over the array of pokemon detailed data, and creating an array of objects with the data we need i.e id, name, image, types
        const res = pokemonData.map( (pokeData) => {
            const pokemon = pokeData.data
            return {
                id: pokemon.id,
                name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
                image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
                types:pokemon.types
            }
        })
        console.log(res);
        setPokemonList(res)

        setIsLoading(false)
    }

    useEffect(() => {
        downloadPokemonList()
    }, [pokedexUrl])


  return (
    <>
        <div className="pokemon-list-wrapper">

            <div className="pokemon-wrapper">
            {(isLoading) ? <Loading /> : pokemonList.map( (pokemon) => <Pokemon key={pokemon.id} name={pokemon.name} image={pokemon.image} id={pokemon.id}/>)}
         
            </div>
            
            <div className="controls">
                <button className="btn btn-prev" disabled={prevUrl == undefined} onClick={() => setPokedexUrl(prevUrl)} >Prev</button>
                <button className="btn btn-next"disabled={nextUrl == undefined} onClick={() => setPokedexUrl(nextUrl)} >Next</button>
            </div>
            <div>next url: {nextUrl}</div> <br />
            <div>prev url: {prevUrl}</div>
        </div>
    </>
  )
}

export default PokemonList