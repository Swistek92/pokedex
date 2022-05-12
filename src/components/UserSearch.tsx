import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import { Pokedex } from './pokedex';
import './search.scss';

const api = axios.create({
  baseURL: `https://pokeapi.co/api/v2/pokemon/`,
});

const getAbility = axios.create({
  baseURL: ``,
});

// abilities.forEach((e: any) => {
//   console.log(e.ability.url);
//   const ability = axios.create({
//     baseURL: `${e.abilities.url}`,
//   });
//   ability.get('/').then((res) => {
//     console.log(res);
//   });
// });

const UserSearch: React.FC = () => {
  const [name, setName] = useState('');
  const [imgs, setImgs] = useState('');
  const [abilities, setAbilities] = useState([]);
  const [abilitesDescription, setAbilitesDescription] = useState([{}]);
  const [pokemons, setPokemons] = useState([
    {
      pokemon: ' ',
      photo:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/129.png',
      abilities: [
        {
          ability: {
            name: 'swift-swim',
            url: 'https://pokeapi.co/api/v2/ability/33/',
          },
          is_hidden: false,
          slot: 1,
        },
        {
          ability: {
            name: 'rattled',
            url: 'https://pokeapi.co/api/v2/ability/155/',
          },
          is_hidden: true,
          slot: 3,
        },
      ],
      abilitesDescription: [{}],
    },
  ]);

  // console.log(pokemons);
  useEffect(() => {
    setPokemons(JSON.parse(localStorage.getItem('pokedex')!));
  }, []);

  if (!localStorage.getItem('pokedex')) {
    localStorage.setItem(
      'pokedex',
      JSON.stringify([
        {
          pokemon: ' ',
          photo:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/129.png',
          abilities: [
            {
              ability: {
                name: 'swift-swim',
                url: 'https://pokeapi.co/api/v2/ability/33/',
              },
              is_hidden: false,
              slot: 1,
            },
            {
              ability: {
                name: 'rattled',
                url: 'https://pokeapi.co/api/v2/ability/155/',
              },
              is_hidden: true,
              slot: 3,
            },
          ],
          abilitesDescription,
        },
      ])
    );
  }

  const onChange = async (e: string) => {
    setName(e);

    api.get(`${e}`).then(async (res) => {
      setAbilities(res.data.abilities);
      setImgs(res.data.sprites.front_default);

      const entries = [];

      for (const { ability } of res.data.abilities) {
        const entry = await getAbility(ability.url);
        entries.push(entry.data.effect_entries);
      }
      console.log(abilitesDescription);
      if (abilitesDescription === [{}]) {
        setAbilitesDescription([...entries]);
      } else {
        setAbilitesDescription([...abilitesDescription, ...entries]);
      }
      console.log(abilitesDescription);
    });
  };

  const addtoPokedex = () => {
    if (!JSON.stringify(pokemons).includes(name)) {
      setPokemons([
        ...pokemons,
        {
          pokemon: name,
          photo: imgs,
          abilities: abilities,
          abilitesDescription: abilitesDescription,
        },
      ]);
      localStorage.setItem(
        'pokedex',
        JSON.stringify([
          ...pokemons,
          {
            pokemon: name,
            photo: imgs,
            abilities: abilities,
            abilitesDescription: abilitesDescription,
          },
        ])
      );
    }
  };

  const showPokemon = () => {
    return (
      <div className='show_pokemon'>
        <div className='pokedex_pokemon'>
          <img className='search__poke' src={imgs} alt='pokemon'></img>

          <ul>
            <h5> Abilities</h5>
            {abilities &&
              abilities.map((e: any) => (
                <div>
                  <li key={e.ability.name}>{e.ability.name}</li>
                </div>
              ))}
          </ul>
        </div>
        <button
          className='btn btn--green btn--animated"'
          onClick={() => addtoPokedex()}
        >
          Add to pokedex!
        </button>
      </div>
    );
  };

  return (
    <div className='container'>
      <div className='search'>
        <h1>Looking For New Pokemon!</h1>
        <input
          className='input'
          onChange={(e) => onChange(e.target.value.toLowerCase())}
        />
        <div className='imgs'></div>
        <div>{imgs && showPokemon()}</div>
      </div>

      <div className='pokedex'>
        <Pokedex pokemons={pokemons}></Pokedex>
      </div>
    </div>
  );
};

export { UserSearch };