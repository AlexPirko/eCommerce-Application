export interface IInput {
  type?: string;
  id: number | string;
  classNames?: string[];
  value?: string;
  placeholder: string;
  name: string;
}

export interface IForm {
  titleText: string;
  descText: string;
  btnText: string;
  linkText: string;
  redirectText: string;
  onSubmit: () => void;
}

export interface IInputBlock extends IInput {
  label: string;
}
