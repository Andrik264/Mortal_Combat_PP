import React, { useEffect, useMemo, useState } from 'react';
import { DefaultContextType, PageContextType, Pages } from '../../Types/PageContext';
import { VsScreen } from '../VsScreen';
import { ChooseHeroPage } from '../ChooseHeroPage';

export const PageContext = React.createContext<
PageContextType | DefaultContextType
>({
  page: Pages.heroesPage,
  setPage: () => {},
})

export const PageProvider = () => {
  const defaultPage = Pages.heroesPage;
  const [page, setPage] = useState<Pages>(defaultPage);

  const contextValue = useMemo(() => ({
    page,
    setPage: async (newPage: Pages) => {
      return new Promise((res ) => {
        setTimeout(() => {
          setPage(newPage);
          res(newPage);
        }, 2000);
      });
    }
  }), [page]);

  
  useEffect(() => {
    if (page === Pages.VsScreen) {

      const timer = async (): Promise<Pages> => new Promise((res) => {
        setTimeout(() => {
          res(Pages.heroesPage);
        }, 4000);
      })

      timer().then(newPage => setPage(newPage));
    }
  }, [page]);

  return (
    <PageContext.Provider value={contextValue}>
      <div className="App">
        {page === Pages.heroesPage
          ? <ChooseHeroPage />
          : <VsScreen />
        }
      </div>
    </PageContext.Provider>
  )
}