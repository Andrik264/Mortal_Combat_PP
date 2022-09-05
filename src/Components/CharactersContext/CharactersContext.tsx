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
  selectedHeroes: {
    firstHero: Characters[0],
    secondHero: Characters[6],
  },
  setSelectedHeroes: () => {},
});

type Props = {
  children: JSX.Element,
}

export const CharactersProvider = ({ children }: Props) => {
  const [selectedHeroes, setSelectedHeroes] = useState<SelectedHeroesType>({
    firstHero: Characters[0],
    secondHero: Characters[6],
  });

  const contextValue = useMemo(() => ({
    selectedHeroes,
    setSelectedHeroes,
  }), [selectedHeroes]);

  return (
    <CharactersContext.Provider value={contextValue}>
      {children}
    </CharactersContext.Provider>
  )
}