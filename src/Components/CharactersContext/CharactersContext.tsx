import React, { useMemo, useState } from 'react';
import {
  DefaultContextType,
  CharactersContextType,
  SelectedHeroesType,
} from '../../Types/CharactersContext';

import { Character } from '../../Types/Character';
const Characters: Character[] = require('../../Data/Characters.json');

export const CharactersContext = React.createContext<
  DefaultContextType | CharactersContextType
>({
  characters: Characters,
  selectedHeroes: {
    firstHero: Characters[5],
    secondHero: Characters[6],
  },
  setSelectedHeroes: () => {},
  setFirstHero: () => {},
  randomHeroes: {
    firstRandomHero: Characters[5],
    SecondRandomHero: Characters[6],
  },
});

type Props = {
  children: JSX.Element,
}

function getRandomCharacterIndex() {
  const max = Characters.length;
  const min = 0;

  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const CharactersProvider = ({ children }: Props) => {
  const [selectedHeroes, setSelectedHeroes] = useState<SelectedHeroesType>({
    firstHero: null,
    secondHero: Characters[getRandomCharacterIndex()],
  });

  const contextValue: CharactersContextType = useMemo(() => ({
    characters: Characters,
    randomHeroes: {
      firstRandomHero: Characters[getRandomCharacterIndex()],
      SecondRandomHero: Characters[getRandomCharacterIndex()],
    },
    selectedHeroes,
    setSelectedHeroes,
    setFirstHero: (hero) => setSelectedHeroes({
      ...selectedHeroes,
      firstHero: hero,
    }),
  }), [selectedHeroes]);

  return (
    <CharactersContext.Provider value={contextValue}>
      {children}
    </CharactersContext.Provider>
  )
}