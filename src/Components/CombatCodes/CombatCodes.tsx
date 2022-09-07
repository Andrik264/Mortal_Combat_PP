import './CombatCodes.scss';
import { useCallback, useState } from 'react';

import { CombatCode } from './CombatCode/CombatCode';
import { useEffect } from 'react';

import { CombatCodes as CombatCodesType } from '../../Types/CombatCodes';
import { CombatCode as CombatCodeType } from '../../Types/CombatCode';

const COMBAT_KEY_CODES = {
  q: 'KeyQ',
  w: 'KeyW',
  e: 'KeyE',
  r: 'KeyR',
  t: 'KeyT',
  y: 'KeyY',
}

export const CombatCodes = () => {
  const [codes, setCodes] = useState<CombatCodesType>({
    q: 0,
    w: 0,
    e: 0,
    r: 0,
    t: 0,
    y: 0,
  });
  
  const getIconNextNumber = useCallback((
    code: keyof CombatCodesType,
    codes: CombatCodesType
  ): CombatCodeType => {
    const maxIconNumber = 9;
    const currentIconNumber = codes[code];
    const iconNextNumber = currentIconNumber === maxIconNumber
      ? 0
      : currentIconNumber + 1;

    return iconNextNumber;
  }, [])

  const codesSwitchHandler = useCallback((e: KeyboardEvent) => {
    const set = (code: keyof CombatCodesType) => {
      const nextIconNumber = getIconNextNumber(code, codes);
      setCodes({ ...codes, [code]: nextIconNumber });
    }

    switch(e.code) {
      case COMBAT_KEY_CODES.q:
        set('q');
        break;
      case COMBAT_KEY_CODES.w:
        set('w');
        break;
      case COMBAT_KEY_CODES.e:
        set('e');
        break;
      case COMBAT_KEY_CODES.r:
        set('r');
        break;
      case COMBAT_KEY_CODES.t:
        set('t');
        break;
      case COMBAT_KEY_CODES.y:
        set('y');
        break;

      default:
        return;
    }
    e.preventDefault();
  }, [codes, getIconNextNumber]);

  useEffect(() => {
    document.addEventListener('keydown', codesSwitchHandler);

    return () => document.removeEventListener('keydown', codesSwitchHandler);
  }, [codesSwitchHandler]);

  return (
    <div className="Combat-codes">
      <CombatCode code={codes.q} />
      <CombatCode code={codes.w} />
      <CombatCode code={codes.e} />
      <CombatCode code={codes.r} />
      <CombatCode code={codes.t} />
      <CombatCode code={codes.y} />
    </div>
  )
}