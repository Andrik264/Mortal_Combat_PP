import './VsScreen.scss';
import React, { useContext, useEffect } from 'react';

import { CharactersContext } from '../CharactersContext';

import { CharacterPreview } from '../CharacterPreview';
import { CombatCodes } from '../CombatCodes';

const backgroundSong = require('../../static/Sounds/VS-Screen.mp3');

export const VsScreen = () => {
  const {
    selectedHeroes: { firstHero, secondHero },
    randomHeroes: { firstRandomHero, SecondRandomHero },
  } = useContext(CharactersContext);

  useEffect(() => {
    const backGroundAudio = new Audio(backgroundSong);
    backGroundAudio.play();
    backGroundAudio.volume = 0.1;

    return () => backGroundAudio.pause();
  }, []);

  return (
    <div className="VS-Screen">
      <div className="VS-Screen__hero-preview-container">
        <CharacterPreview character={firstHero || firstRandomHero} />
      </div>

      <CombatCodes />

      <div className="VS-Screen__hero-preview-container">
        <CharacterPreview character={secondHero || SecondRandomHero} />
      </div>
    </div>
  );
}