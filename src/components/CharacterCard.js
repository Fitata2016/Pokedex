import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CharacterCard = ({characterUrl}) => {
    
    const [character, setCharacter] = useState({})

    useEffect(()=>{
        axios.get(characterUrl)
        .then(res => setCharacter(res.data))
    },[characterUrl])
    console.log(character)
    return (
        <li className='character-card'>
        <Link to={`/characters/${character.id}`}>
            <h3>{character.name}</h3>
            <p>Peso: {character.weight}</p>
            <img src={character.sprites?.other?.dream_world?.front_default} alt="" />
            {/* <p>{character?.types[0]?.type?.name}</p> */}
        </Link>
    </li>
    );
};

export default CharacterCard;