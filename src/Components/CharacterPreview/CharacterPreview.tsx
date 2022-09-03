import './CharacterPreview.scss';

import { Character } from "../../Types/Character";

type Props = {
  character: Character,
}

export const CharacterPreview = ({ character }: Props) => {

  return (
    <div className='Hero-preview'>
      <h2 className='Hero-preview__name'>
        {character.name}
      </h2>
      <img
        className='Hero-preview__image'
        src={character.picture}
        alt={character.name}
      />
    </div>
  )
}