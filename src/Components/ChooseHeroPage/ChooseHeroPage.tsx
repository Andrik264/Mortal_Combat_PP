import './ChooseHeroPage.scss';
import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import classNames from 'classnames';

import { PageContext } from '../PageContext';
import { CharactersContext } from '../CharactersContext';
import { Pages } from '../../Types/PageContext';

import { CharacterPreview } from '../CharacterPreview';

import { Character } from '../../Types/Character';

const backgroundSong = require('../../static/Sounds/Player Select.mp3');

const keyCodes = {
  left: 'ArrowLeft',
  right: 'ArrowRight',
  up: 'ArrowUp',
  down: 'ArrowDown',
  enter: 'Enter',
  cancel: 'Escape',
}
const COLUMNS_PER_ROW = 5;

function createMatrix(items: any[], itemsPerRow: number) {
  const result = [];
  let row = [];

  for (let i = 0; i < items.length; i++) {
    if (row.length === itemsPerRow) {
      result.push(row);
      row = [];
    }

    row.push(items[i]);
  }

  if (row.length) {
    result.push(row);
  }

  return result;
}

export const ChooseHeroPage = () => {
  const { setPage } = useContext(PageContext);
  const {
    characters,
    selectedHeroes,
    setFirstHero,
  } = useContext(CharactersContext);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const charactersMatric = useMemo<Character[][]>(
    () => createMatrix(characters, COLUMNS_PER_ROW),
    [characters],
  );
  const focusedHero = useMemo(() => {
    const { x, y } = position;
    return charactersMatric[y][x];
  }, [charactersMatric, position]);

  const handleHeroSelect = useCallback((event: KeyboardEvent) => {
    if (selectedHeroes.firstHero) return;

    const step = 1;
    let nextPosition;
    let t_NP; // temporary_nextPosition

    const firstRowIndex_Y = 0;
    const lastRowIndex_Y = charactersMatric.length - 1;

    const firstColumnIndex_X = 0;
    const lastColumnIndex_X = charactersMatric[position.y].length - 1;

    switch(event.code) {
      case keyCodes.left:
        t_NP = position.x - step;
        nextPosition = { x: t_NP >= firstColumnIndex_X
          ? t_NP
          : lastColumnIndex_X
        };
        break;

      case keyCodes.right:
        t_NP = position.x + step;
        nextPosition = { x: t_NP <= lastColumnIndex_X
          ? t_NP
          : firstColumnIndex_X
        };
        break;

      case keyCodes.up:
        t_NP = position.y - step;
        nextPosition = { y: t_NP >= firstRowIndex_Y
          ? t_NP
          : lastRowIndex_Y
        };
        break;

      case keyCodes.down:
        t_NP = position.y + step;
        nextPosition = { y: t_NP <= lastRowIndex_Y
          ? t_NP
          : firstRowIndex_Y
        };
        break;

      case keyCodes.enter:
        setFirstHero(focusedHero);
        setPage(Pages.VsScreen);
        break;

      default:
        return;
    }

    setPosition({ ...position, ...nextPosition });
  }, [
    position,
    selectedHeroes,
    focusedHero,
    charactersMatric,
    setFirstHero,
    setPage,
  ]);

  useEffect(() => {
    setFirstHero(null);
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleHeroSelect);

    return () => {
      document.removeEventListener('keydown', handleHeroSelect);
    }
  }, [handleHeroSelect]);
  
  useEffect(() => {
    const backGroundAudio = new Audio(backgroundSong);
    const playSong = () => {
      backGroundAudio.play();
      backGroundAudio.volume = 0.1;
    }

    playSong();
    backGroundAudio.addEventListener('ended', playSong)

    return () => {
      backGroundAudio.removeEventListener('ended', playSong);

      backGroundAudio.pause();
    }
  }, []);

  return (
    <div className="HeroesPage">
      <h1 className='HeroesPage__title'>Choose your fighter</h1>
      <div className='HeroesPage__container'>
        <CharacterPreview character={selectedHeroes.firstHero || focusedHero} />

        <ul className='HeroesPage__list'>
          {charactersMatric.map((row: Character[], rowIndex: number) => {
            return row.map((character: Character, columnIndex: number) => (
              <li
                key={character.id}
                className={classNames(
                  'HeroesPage__list-item',
                  `HeroesPage__list-item--pos-${rowIndex}${columnIndex}`,
                  { 'HeroesPage__list-item--is-focused': !selectedHeroes.firstHero
                    && focusedHero.id === character.id },
                  { 'HeroesPage__list-item--is-selected-by-1':
                    selectedHeroes.firstHero?.id === character.id },
                  { 'HeroesPage__list-item--is-selected-by-2':
                    selectedHeroes.secondHero?.id === character.id },
                  { 'HeroesPage__list-item--is-selected-by-both':
                    selectedHeroes.firstHero?.id === character.id
                    && selectedHeroes.secondHero?.id === character.id
                  },
                )}
              >
                <img
                  className='hero_picture'
                  src={character.picture}
                  alt={character.name}
                />
              </li>
            ))
          })}
        </ul>

        <CharacterPreview character={selectedHeroes.secondHero} />
      </div>
    </div>
  )
}