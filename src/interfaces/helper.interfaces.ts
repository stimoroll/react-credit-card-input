import CreditCard from "./card.interface";
import { SetValue } from "../types/helper.types";

export interface CardContextInterface {
  cardData?: CreditCard,
  setCardData: SetValue
}