import React, { Fragment, useState, useContext } from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
// @ts-ignore
import PaymentIcon from 'react-payment-icons';
import InputMask from 'react-input-mask';
import CardIcon from '@material-ui/icons/Payment';

import { number } from "card-validator";
import { CardNumberVerification } from 'card-validator/dist/card-number';

import { InputProps } from '../types/helper.types';
import { CreditCardDataContext } from './CredtCardInput';


const CardNumberInput = ({leaveFieldCallback, focus, tabIndex}:InputProps) => {
  const [cardType, setCardType] = useState("");
  const [error, setError] = useState(false);
  const [info, setInfo] = useState("");

  const CardContext = useContext(CreditCardDataContext);

  const handleChange = (event:any) => {
    const cardNumberValue = event?.target?.value;
    const cardNumberValidator:CardNumberVerification = number(cardNumberValue);
    setCardType(cardNumberValidator?.card?.type || "");

    if(!cardNumberValidator.isPotentiallyValid) {
      setError(true);
      setInfo("are you shure is valid?");
    } else if (!cardNumberValidator.isValid) {
      setError(true);
      setInfo("still something sticky");
    } else if (cardNumberValidator.isValid && leaveFieldCallback) {
      setError(false);
      setInfo("");
      leaveFieldCallback(tabIndex + 1);
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
      setInfo("its not valid number");
    }
  }

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