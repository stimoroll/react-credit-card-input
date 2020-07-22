import React, { Fragment, useRef, useEffect, useState, useContext } from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
// @ts-ignore
import PaymentIcon from 'react-payment-icons';
import InputMask from 'react-input-mask';
import CardIcon from '@material-ui/icons/Payment';

import { number } from "card-validator";
import { CardNumberVerification } from 'card-validator/dist/card-number';

import { InputProps } from '../types/helper.types';
import { CreditCardDataContext } from './CredtCardInput';

//TODO: still not proper valid at last char if number is not valid

const CardNumberInput = ({leaveFieldCallback, focus, tabIndex}:InputProps) => {
  const [cardType, setCardType] = useState("");
  const [error, setError] = useState(false);
  const [info, setInfo] = useState("");
  const inputRef = useRef<HTMLInputElement>(null!);

  const CardContext = useContext(CreditCardDataContext);

  const handleChange = (event:any) => {
    const cardNumberValue:string = event?.target?.value;
    const cardNumberValidator:CardNumberVerification = number(cardNumberValue);

    setCardType(cardNumberValidator?.card?.type || "");
      if(/([0-9]+)/.test(cardNumberValue) && !cardNumberValidator.isPotentiallyValid) {
        setError(true);
        setInfo("are you shure is valid?");
        //TODO: is not good
      // } else if (/([0-9]{4,})/.test(cardNumberValue) && !cardNumberValidator.isValid) {
      //   setError(true);
      //   setInfo("still something sticky");
      } else if (!/([0-9]+)/.test(cardNumberValue)) {
        setError(false);
        setInfo("");
      } else if (cardNumberValidator.isValid) {
        setError(false);
        setInfo("");
        if(leaveFieldCallback) {
          leaveFieldCallback(tabIndex + 1);
        }
      }
  }

  const handleBlur = (event:any) => {
    const cardNumberValue = event?.target?.value;
    const cardNumberValidator:CardNumberVerification = number(cardNumberValue);
    if(cardNumberValidator.isValid) {
      setError(false);
      setInfo("");
      CardContext?.setCardData({
        ...CardContext.cardData,
        cardNumber: event?.target?.value || "",
        cvclenght: cardNumberValidator?.card?.code.size || 3
      });
    } else {
      setError(true);
      setInfo("still something sticky");
      if(leaveFieldCallback) {
        leaveFieldCallback(tabIndex);
      }
    }
  }

  useEffect(() => {
    if(focus) {
      inputRef.current.focus();
    }
  }, [focus])

  return (
    <Fragment>
      <InputMask
        mask="9999 9999 9999 9999"
        maskChar=" "
        onChange={handleChange}
        onBlur={handleBlur}
      >
      {() =>
        <TextField
          error={error}
          id="standard-error-helper-text"
          label="Card Number"
          tabIndex={tabIndex}
          autoFocus={focus}
          helperText={info}
          inputRef={inputRef}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {
                  cardType === "" &&
                  <CardIcon/>
                }
                {
                  cardType !== "" &&
                  <PaymentIcon
                    id={cardType}
                    style={{ margin: 10, width: 24 }}
                    className="payment-icon"
                  />
                }
              </InputAdornment>
            ),
          }}
        />
      }
      </InputMask>
    </Fragment>
  )
}

export default CardNumberInput;