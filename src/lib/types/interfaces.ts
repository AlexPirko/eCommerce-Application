export interface IInput {
  readonly type: string;
  readonly id: number;
  readonly classNames: string[];
  value: string;
  readonly placeholder: string;
}

export interface IInputBlock extends IInput {
  label: string;
}
