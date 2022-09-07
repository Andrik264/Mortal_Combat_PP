export interface DefaultContextType {
  page: Pages,
  setPage: (newPage: Pages) => void,
}

export interface PageContextType {
  page: Pages;
  setPage: React.Dispatch<React.SetStateAction<Pages>>;
}

export enum Pages {
  heroesPage = "chooseHeroPgae",
  VsScreen = 'vs-screen',
}