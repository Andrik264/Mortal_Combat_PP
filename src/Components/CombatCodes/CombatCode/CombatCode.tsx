import './CombatCode.scss';

type Props = {
  // code: 0 | 1 | 2| 3 | 4 | 5 | 6 | 7 | 8 | 9;
  code: number;
}

export const CombatCode = ({ code }: Props) => {
  return (
    <div className="Combat-code">
      <img
        className='Combat-code__icon'
        src={`Mortal_Combat_PP/Pictures/CombatCodeIcons/${code}.webp`}
        alt={`Combat Code ${code}`}
      />
    </div>
  )
}