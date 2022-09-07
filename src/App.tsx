import { PageProvider } from './Components/PageContext';
import { CharactersProvider } from './Components/CharactersContext';

export default function App() {
  return (
    <CharactersProvider>
      <PageProvider />
    </CharactersProvider>
  );
}
