export const absLenght = (value:any):number => value.split("")
  .map((item:any) => parseInt(item))
  .filter((item:any) => !isNaN(item))
  .length;