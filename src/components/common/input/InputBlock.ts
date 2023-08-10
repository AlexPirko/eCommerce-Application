import { Input } from './Input';

import EmailValidate from 'src/lib/utils/emailValidate';
import PasswordValidate from 'src/lib/utils/passwordValiate';

interface IInput {
  type: string;
  id: number;
  label: string;
  classNames: string[];
  placeholder: string;
  value: string;
}

export default class InputBlock extends Input implements IInput {
  type: string;
  id: number;
  label: string;
  classNames: string[];
  placeholder: string;
  value: string;
  create: DocumentFragment;
  input: HTMLInputElement | null;
  labelEl: HTMLLabelElement | null;

  constructor(type: string, id: number, label: string, classNames: string[], placeholder: string, value: string) {
    super(type, id, classNames, value, placeholder);
    this.type = type;
    this.id = id;
    this.label = label;
    this.classNames = classNames;
    this.placeholder = placeholder;
    this.value = value;
    this.create = this.createInputBlock();
    this.input = null;
    this.labelEl = null;
  }

  createLabel(): HTMLLabelElement {
    const label: HTMLLabelElement = document.createElement('label');
    label.setAttribute('for', this.id.toString());
    label.textContent = this.label;
    this.labelEl = label;
    return label;
  }

  createErrorBlock(): HTMLSpanElement {
    const error: HTMLSpanElement = document.createElement('span');
    error.classList.add('error-text');
    return error;
  }

  highlightError(isError: boolean): void {
    if (this.labelEl !== null) {
      if (isError) {
        this.labelEl.classList.add('visible');
        this.labelEl.textContent = `Incorrect ${this.type.toLowerCase()}`;
      } else {
        this.labelEl.classList.remove('visible');
      }
    }
  }

  error(isError: boolean): void {
    console.log(this.input);
    isError;
    // if (this.input !== null) {
    //   this.input.classList.remove('error');
    //   this.highlightError(isError);
    //   if (isError) {
    //     this.input.classList.add('error');
    //   }
    // }
  }

  validate(value: string) {
    let isError = false;
    if (this.type === 'email') {
      isError = new EmailValidate().validate(value);
    } else {
      isError = new PasswordValidate().validate(value);
    }
    this.error(!isError);
    return !isError;
  }

  createInputBlock(): DocumentFragment {
    const fragment: DocumentFragment = new DocumentFragment();
    this.input = super.createInput(this.error);
    console.log(this.input);
    fragment.append(this.createLabel(), this.input, this.createErrorBlock());
    return fragment;
  }
}
