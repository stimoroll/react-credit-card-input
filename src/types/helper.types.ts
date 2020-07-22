import * as React from 'react';

export type cardDate = {
  moth: string,
  year: string
}

export type InputProps = {
  leaveFieldCallback?:Function,
  focus: boolean,
  tabIndex: number
}

export type Props = {
  children: React.ReactNode;
};

export type SetValue = (value: any) => void;