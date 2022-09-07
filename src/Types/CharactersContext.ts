import { Character } from "./Character";

export type SelectedHeroesType = {
  firstHero: Character | null,
  secondHero: Character,
}

export interface DefaultContextType {
  characters: Character[],
  selectedHeroes: SelectedHeroesType;
  setSelectedHeroes: () => void;
  setFirstHero: () => void;
  randomHeroes: {
    firstRandomHero: Character,
    SecondRandomHero: Character,
  };
}

export interface CharactersContextType {
  characters: Character[],
  selectedHeroes: SelectedHeroesType;
  setSelectedHeroes: React.Dispatch<React.SetStateAction<SelectedHeroesType>>;
  setFirstHero: (character: Character | null) => void;
  randomHeroes: {
    firstRandomHero: Character,
    SecondRandomHero: Character,
  };
}
