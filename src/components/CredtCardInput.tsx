
import React, { Fragment, useEffect, useState, createContext } from 'react';
import CVCInput from './CVCInput';
import DateInput from './DateInput';
import CardNumberInput from './CardNumberInput';
import CreditCard from '../interfaces/card.interface';
import { CardContextInterface } from '../interfaces/helper.interfaces';
import { Props } from '../types/helper.types';


export const CreditCardDataContext = createContext<CardContextInterface | null>(null);

export const CardProvider = ({ children }: Props) => {
  const [cardData, setCardData] = useState<CreditCard | undefined>(undefined);

  return (
    <CreditCardDataContext.Provider value={{ cardData, setCardData }}>
      {children}
    </CreditCardDataContext.Provider>
  );
};

const CreditCardInput = () => {
  const [focusIndex, setFocusIndex] = useState<Array<boolean>>([]);
  const [cardData, setCardData] = useState<CreditCard | undefined>(undefined);

  const leaveField = (index:number) => {
    const indexArray = new Array<boolean>(3).fill(false);
    indexArray[index] = true;
    console.log("LEAVE", indexArray);
    setFocusIndex(indexArray);;
  }

  const setFocusOnFirst = () => {
    leaveField(0);
  }

  useEffect(() => {
    leaveField(0);
  }, []);

  useEffect(() => {
    window.addEventListener("focus", setFocusOnFirst);
    return () => {
      window.removeEventListener("focus", setFocusOnFirst);
    }
  }, [setFocusOnFirst]);

  return (
    <CreditCardDataContext.Provider value={{ cardData, setCardData }}>
      <Fragment>
        <CardNumberInput
          leaveFieldCallback={leaveField}
          focus={focusIndex[0]}
          tabIndex={0}
        />
        <DateInput
          leaveFieldCallback={leaveField}
          focus={focusIndex[1]}
          tabIndex={1}
        />
        <CVCInput
          focus={focusIndex[2]}
          tabIndex={2}
        />
      </Fragment>
    </CreditCardDataContext.Provider>
  )
}

export default CreditCardInput;