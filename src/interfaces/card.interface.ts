import { cardDate } from "../types/helper.types";

export default interface ICreditCard {
  cardNumber: string,
  cvc: string,
  cvclenght: number,
  date: cardDate
}

export default class CreditCard implements ICreditCard {

}

