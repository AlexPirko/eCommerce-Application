export interface IInput {
  type: string;
  id: number;
  classNames: string[];
  value: string;
  placeholder: string;
}

export interface IInputBlock extends IInput {
  label: string;
}
