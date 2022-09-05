import './CombatCodes.scss';
import { useCallback, useState } from 'react';

import { CombatCode } from './CombatCode/CombatCode';
import { useEffect } from 'react';

import { CombatCodes as CombatCodesType } from '../../Types/CombatCodes';
import { CombatCode as CombatCodeType } from '../../Types/CombatCode';

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
    // let iconNextNumber;

    // if (currentIconNumber === maxIconNumber) {
    //   iconNextNumber = 0;
    // } else {
    //   iconNextNumber = currentIconNumber;
    // }

    return iconNextNumber;
  }, [])

  const codesSwitchHandler = useCallback((e: KeyboardEvent) => {
    const set = (code: keyof CombatCodesType) => {
      const nextIconNumber = getIconNextNumber(code, codes);
      setCodes({ ...codes, [code]: nextIconNumber });
    }

    switch(e.code) {
      case 'KeyQ':
        set('q');
        break;

      case 'KeyW':
        set('w');
        break;

      case 'KeyE':
        set('e');
        break;

      case 'KeyR':
        set('r');
        break;

      case 'KeyT':
        set('t');
        break;

      case 'KeyY':
        set('y');
        break;

      default:
        return;
    }
    e.preventDefault();
    // console.group('Event');
    // console.log('code:', e.code);
    // console.log('key:', e.key);
    // console.log('codes', codes);
    // console.groupEnd();

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