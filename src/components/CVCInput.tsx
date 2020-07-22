import React, { useState, useRef, useEffect, useContext } from 'react';
import { TextField } from '@material-ui/core';
import InputMask from 'react-input-mask';
import { cvv } from "card-validator";
import { Verification } from 'card-validator/dist/types';
import { InputProps } from '../types/helper.types';
import { CreditCardDataContext } from './CredtCardInput';

interface CVCInputProps extends InputProps {
  charcount?: number;
}
//TODO: chnange to props
const CVCInput = ({leaveFieldCallback, focus, tabIndex}:CVCInputProps) => {
  const [error, setError] = useState(false);
  const [info, setInfo] = useState("");

  const CardContext = useContext(CreditCardDataContext);
  const inputRef = useRef<HTMLInputElement>(null!);
  const cvccount = CardContext?.cardData?.cvclenght;


  const handleChange = (event:any) => {
    const CVCvalue = event?.target?.value;
    const CVCverify:Verification = cvv(event?.target?.value);

    //TODO: lenght not work - replace with regex
    if(CVCvalue?.lenght !== cvccount) {
      setError(true);
      setInfo("Incorect CVC length");
    } else if (!CVCverify.isPotentiallyValid) {
      setError(true);
      setInfo("Dont now what but something sticky");
    } else if (CVCverify.isValid) {
      setError(false);
      setInfo("");
      if(leaveFieldCallback) {
        leaveFieldCallback(tabIndex + 1);
      }
    }
  }

  const handleBlur = (event:any) => {
    const CVCvalue = event?.target?.value;
    const value:Verification = cvv(CVCvalue);
    if(value.isValid) {
      setError(false);
      setInfo("");
      CardContext?.setCardData({
        ...CardContext.cardData,
        cvc: CVCvalue
      });
    } else {
      //TODO: could rmove - its redundand
      setError(true);
      setInfo("Its not valid CVC code");
    }
  }

useEffect(() => {
  if(focus) {
    inputRef.current.focus();
  }
}, [focus])
//TODO: props cvc count i mask na to ustawić
  return (
    <InputMask
      mask="999"
      maskChar=" "
      onChange={handleChange}
      onBlur={handleBlur}
    >
    {() =>
      <TextField
        name="cvc"
        label="CVC"
        type="text"
        error={error}
        placeholder="XXX"
        tabIndex={tabIndex}
        required
        helperText={info}
        autoFocus={focus}
        inputRef={inputRef}
      />
    }
    </ InputMask>
  )
}

export default CVCInput;