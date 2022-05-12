import { type } from 'os';
import React, { useState } from 'react';
// import { pokemons } from './UserSearch';

const Pokedex = (props: any): any => {
  const [toggleHover, setToggleHover] = useState(false);
  const [hoverIndex, setHoverIndex] = useState();
  const poki = props.pokemons.slice(1);

  const renderPokedex = () => {
    return poki.map((pokemon: any) => (
      <div key={pokemon.pokemon}>
        <li className='pokemon_element'>
          <h5>{pokemon.pokemon}</h5>{' '}
          <img className='img_pokemon' src={pokemon.photo} alt='pokemon'></img>{' '}
          <div className='details'>
            <h5>Abilitys: {pokemon.pokemon}</h5>

            {pokemon.abilities.map((e: any, i: any) => (
              <div
                onMouseEnter={() => {
                  setToggleHover(false);
                }}
                onMouseLeave={() => {
                  setToggleHover(true);
                }}
                className={`abilitiName ${i + 1}`}
              >
                <h2 key={e.ability.name}>
                  {i + 1} {e.ability.name}{' '}
                </h2>
              </div>
            ))}
            <h3>Abilities Descriptions:</h3>
            {pokemon.abilitesDescription.map((e: any, i: any) => (
              <div className={`abilitiDescription ${i}`}>
                {e[1] === undefined ? null : (
                  <>
                    {i} {e[1].short_effect}
                  </>
                )}
              </div>
            ))}
          </div>
        </li>
      </div>
    ));
  };

  return (
    <div>
      <h1>POKEDEX</h1>
      <h3>pokemons:</h3>
      <ul>{renderPokedex()}</ul>
    </div>
  );
};

export { Pokedex };
