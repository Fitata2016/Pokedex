import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';



const CharacterInfo = () => {

    const {id} = useParams();

    const [character, setCharacter]= useState({});

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(res => setCharacter(res.data))

    },[id]);
    return (
        <div className='character-info'>
            <section className='sections'>
                <img src={character.sprites?.other?.home?.front_default} alt="" />
                <p>Peso: {character.weight}</p>
                <p>Altura: {character.height}</p>
                <h1>{character.name}</h1>
                <p># {character.id}</p>
            </section>
            <section className='sections'>
                <h2>Type</h2>
                <p>{character?.types?.[0].type?.name}</p>
            </section>
            


        </div>
    );
};

export default CharacterInfo;