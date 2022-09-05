import './ChooseHeroPage.scss';
import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
} from 'react';
import classNames from 'classnames';

import { PageContext } from '../PageContext';
import { Pages } from '../../Types/PageContext';

import { CharacterPreview } from '../CharacterPreview';

import { Character } from '../../Types/Character';
const Characters = require('../../Data/Characters.json');
const backgroundSong = require('../../static/Sounds/Player Select.mp3');

const arrowKeysCodes = {
  left: 'ArrowLeft',
  right: 'ArrowRight',
  up: 'ArrowUp',
  down: 'ArrowDown',
}

export const ChooseHeroPage = () => {
  const focusedHeroByDefault = Characters[0];
  const [focusedHero, setFocusedHero] = useState(focusedHeroByDefault);
  const [fisrtSelectedHero, setFirstHero] = useState<Character | null>(null);
  const selectedSecondHero = Characters[5];
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const { setPage } = useContext(PageContext);

  const handleHeroSelect = useCallback((event: KeyboardEvent) => {
    switch(event.code) {
      case arrowKeysCodes.left:
        setPosition({ ...position, x: position.x-- });
        break;
      case arrowKeysCodes.right:
        setPosition({ ...position, x: position.x++ });
        break;
      case arrowKeysCodes.up:
        setPosition({ ...position, y: position.y++ });
        break;
      case arrowKeysCodes.down:
        setPosition({ ...position, y: position.y-- });
        break;
    }

    console.log(position);
  }, []);
  
  useEffect(() => {
    document.addEventListener('keydown', handleHeroSelect);
    // const backGroundAudio = new Audio(backgroundSong);
    // backGroundAudio.play();

    return () => document.removeEventListener('keydown', handleHeroSelect);
  }, []);

  return (
    <div className="HeroesPage">
      <h1>Select your fighter</h1>
      <button type='button' onClick={() => {
        console.log('clickkkkk');
        
        setPage(Pages.VsScreen)
      }}>
        Press me
      </button>
      <div className='HeroesPage__container'>
        <CharacterPreview character={focusedHero} />

        <ul className='HeroesPage__list'>
          {Characters.map((character: Character) => (
            <li
              key={character.id}
              className={classNames(
                'HeroesPage__list-item',
                { 'HeroesPage__list-item--is-focused': focusedHero.id === character.id },
              )}
            >
              <img
                className='hero_picture'
                src={character.picture}
                alt={character.name}
              />
            </li>
          ))}
        </ul>

        <CharacterPreview character={selectedSecondHero} />
      </div>
    </div>
  )
}