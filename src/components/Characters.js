import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {useNavigate} from "react-router-dom"
import CharacterCard from './CharacterCard';

const Characters = () => {

    const userName = useSelector(state => state.userName)
    const navigate = useNavigate();

    const [characters, setCharacters] = useState([]);
    const [types, setTypes] = useState([]);
    const [pokemonName, setPokemonName] = useState("");
    

    useEffect(() => {
        axios.get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1126")
        .then(res => setCharacters(res.data.results));

        axios.get("https://pokeapi.co/api/v2/type")
        .then(res => setTypes(res.data.results));
    },[]) 

    const [page, setPage] = useState (1);

    const itemsNumber = 8;
    const lastIndex = page * itemsNumber;
    const firstIndex = lastIndex - itemsNumber;
    const charactersPaginated = characters?.slice(firstIndex,lastIndex);
    const totalPages = Math.ceil(characters?.length/itemsNumber)
    const pagesNumbers = [];
    for(let i =1; i <= totalPages; i++){
        pagesNumbers.push(i)
    }
    

    const submit = e => {
        e.preventDefault();
        navigate(`/characters/${pokemonName}`)
    }
    const handleType =e => {
        console.log(e.target.value)
        axios.get(e.target.value)
        .then(res => setCharacters(res.data.pokemon))

    }


    return (
        <div className='cotainer-characters'>
            
            <h1>Pokedex</h1>
            <p>Bienvenido {userName}, aquí puedes encontrar tus pokemones favoritos. ATRAPALOS YA!</p>
            <div className='select'>
                <select onChange={handleType}>
                    <option>Selecciona por tipo</option>
                    
                    {
                        types.map(type => (
                        <option key={type.url} value= {type.url}>
                            {type.name}
                        </option>
                        ))
                    }
                </select>
            </div>
            <form className='input-container' onSubmit={submit}>
                <label htmlFor='character-name' >Buscar por Nombre </label>
                <input type="text" 
                    id="character-name"
                    value={pokemonName}
                    onChange={e => setPokemonName(e.target.value)} 
                />
                <button>Buscar</button>
            </form>
            <ul className='character-list'>{
                charactersPaginated.map(character => (
                   <CharacterCard 
                   characterUrl={character.url ? character.url :character.pokemon.url} 
                   key= {character.url ? character.url :character} />
                ))
            }
            </ul> 
            <button 
            onClick={() => setPage(page-1)}
            disabled = {page <= 1}>
                Pagina previa
            </button>
               {page}/{totalPages}
            <button 
            onClick={() => setPage(page+1)}
            disabled = {page >= totalPages}>
                Pagina Siguiente
            </button>
            <div>
                {pagesNumbers.map(page => (
                <button onClick={() => setPage(page)} key={page}>
                    {page}
                </button>
                ))}
            </div>
        </div>
    );
};

export default Characters;