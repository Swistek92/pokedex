import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pokedex } from './pokedex';
import './PokemonApp.scss';

const api = axios.create({
  baseURL: `https://pokeapi.co/api/v2/pokemon/`,
});

const getAbility = axios.create({
  baseURL: ``,
});

const PokemonApp: React.FC = () => {
  const [name, setName] = useState('');
  const [imgs, setImgs] = useState('');
  const [abilities, setAbilities] = useState([]);
  const [abilitesDescription, setAbilitesDescription] = useState([{}]);
  const [toggleHover, setToggleHover] = useState(true);
  const [hoverIndex, setHoverIndex] = useState(1);
  const [isShowing, setIsShowing] = useState('');
  const [pokemons, setPokemons] = useState([
    {
      pokemon: ' ',
      photo: '',
      abilities: [
        {
          ability: {
            name: '',
            url: '',
          },
          is_hidden: true,
          slot: 0,
        },
        {
          ability: {
            name: '',
            url: '',
          },
          is_hidden: true,
          slot: 0,
        },
      ],
      abilitesDescription: [{}],
    },
  ]);

  useEffect(() => {
    setPokemons(JSON.parse(localStorage.getItem('pokedex')!));
  }, []);

  if (!localStorage.getItem('pokedex')) {
    localStorage.setItem(
      'pokedex',
      JSON.stringify([
        {
          pokemon: ' ',
          photo: '',
          abilities: [
            {
              ability: {
                name: '',
                url: '',
              },
              is_hidden: false,
              slot: 0,
            },
            {
              ability: {
                name: '',
                url: '',
              },
              is_hidden: true,
              slot: 0,
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

      if (abilitesDescription === [{}]) {
        setAbilitesDescription([...entries]);
      } else {
        setAbilitesDescription([...abilitesDescription, ...entries]);
      }
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

  const addToPokedexBtn = () => {
    return (
      <button
        className='btn btn--green btn--animated"'
        onClick={() => addtoPokedex()}
      >
        Add to pokedex!
      </button>
    );
  };

  const showDescription = () => {
    return (
      <div>
        {abilitesDescription &&
          abilitesDescription.map(
            (e: any, i: any) =>
              i === hoverIndex && (
                <div className={`showDescription  ${toggleHover && 'hover'}`}>
                  {
                    <>
                      <h5> {isShowing}</h5>
                      <p>{e[1].short_effect}</p>
                    </>
                  }
                </div>
              )
          )}
      </div>
    );
  };

  const showPokemon = () => {
    return (
      <div className='show_pokemon'>
        <div className='pokedex_pokemon'>
          <img className='search__poke' src={imgs} alt='pokemon'></img>
          <ul>
            <h2 className='search__poke__header'> Abilities</h2>
            {abilities &&
              abilities.map((e: any, i: any) => (
                <div>
                  <ul className='search__poke__description'>
                    <li
                      onMouseEnter={() => {
                        setToggleHover(false);
                        setHoverIndex(i + 1);
                        setIsShowing(e.ability.name);
                      }}
                      onMouseLeave={() => {
                        setToggleHover(true);
                        setIsShowing('');
                      }}
                      key={e.ability.name}
                    >
                      {e.ability.name}
                    </li>
                  </ul>
                </div>
              ))}
          </ul>
        </div>
        {addToPokedexBtn()}
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
        {abilitesDescription.length > 1 && (
          <div className='description'>{showDescription()}</div>
        )}
      </div>

      <div className='pokedex'>
        <Pokedex pokemons={pokemons}></Pokedex>
      </div>
    </div>
  );
};

export { PokemonApp };
