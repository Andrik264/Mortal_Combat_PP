import { Character } from "./Character";

export type SelectedHeroesType = {
  firstHero: Character,
  secondHero: Character,
}

export interface DefaultContextType {
  selectedHeroes: SelectedHeroesType;
  setSelectedHeroes: () => void;
}

export interface CharactersContextType {
  selectedHeroes: SelectedHeroesType;
  setSelectedHeroes: React.Dispatch<React.SetStateAction<SelectedHeroesType>>;
}
