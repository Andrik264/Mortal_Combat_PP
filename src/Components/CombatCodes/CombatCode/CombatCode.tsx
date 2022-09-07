import './CombatCode.scss';

type Props = {
  code: number;
}

export const CombatCode = ({ code }: Props) => {
  return (
    <div className="Combat-code">
      <img
        className='Combat-code__icon'
        src={`Pictures/CombatCodeIcons/${code}.webp`}
        alt={`Combat Code ${code}`}
      />
    </div>
  )
}