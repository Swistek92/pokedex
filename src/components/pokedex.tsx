import React, { useState } from 'react';
import './pokedex.scss';
const Pokedex = (props: any): any => {
  const [toggleHover, setToggleHover] = useState(true);
  const [hoverIndex, setHoverIndex] = useState(1);
  const [name, setName] = useState('');

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
                  setHoverIndex(i + 1);
                  setName(e.ability.name);
                }}
                onMouseLeave={() => {
                  setToggleHover(true);
                  console.log(toggleHover);
                }}
                className={`abilitiName ${i + 1}`}
              >
                <h2 key={e.ability.name}>
                  {i + 1} {e.ability.name}{' '}
                </h2>
              </div>
            ))}
            <h3>Abilities Description:</h3>
            {pokemon.abilitesDescription.map((e: any, i: any) => (
              <div className={`abilitiDescription ${toggleHover && 'hover'}`}>
                {i === hoverIndex && (
                  <>
                    <p>
                      <b>{name}</b> {e[1].short_effect}
                    </p>
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
