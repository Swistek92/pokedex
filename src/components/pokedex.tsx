import React, { useState } from 'react';
// import { pokemons } from './UserSearch';

const Pokedex = (pokemons: any): any => {
  const poki = pokemons.pokemons;

  const renderPokedex = () => {
    return poki.map((pokemon: any) => (
      <div key={pokemon.pokemon}>
        <li className='pokemon_element'>
          <h5>{pokemon.pokemon}</h5>{' '}
          <img className='img_pokemon' src={pokemon.photo} alt='pokemon'></img>{' '}
          <div className='details'>
            <h5>Abilitys: {pokemon.pokemon}</h5>
            {poki.map((e: any) => {
              console.log(e);
            })}

            {/* {pokemon.abilities.map((e: any) => (
              <p key={e.ability.name}> {e.ability.name}</p>
            ))} */}
          </div>
        </li>

        <ul></ul>
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
