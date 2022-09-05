import './VsScreen.scss';
import React, { useContext, useEffect } from 'react';

import { CharactersContext } from '../CharactersContext';

import { CharacterPreview } from '../CharacterPreview';
import { CombatCodes } from '../CombatCodes';

const backgroundSong = require('../../static/Sounds/VS-Screen.mp3');

export const VsScreen = () => {
  const { selectedHeroes } = useContext(CharactersContext);

  useEffect(() => {
    const backGroundAudio = new Audio(backgroundSong);
    backGroundAudio.play();

    return () => backGroundAudio.pause();
  }, []);

  return (
    <div className="VS-Screen">
      <div className="VS-Screen__hero-preview-container">
        <CharacterPreview character={selectedHeroes.firstHero} />
      </div>

      <CombatCodes />

      <div className="VS-Screen__hero-preview-container">
        <CharacterPreview character={selectedHeroes.secondHero} />
      </div>
    </div>
  );
}