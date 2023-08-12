import { Input } from './Input';
import './input.scss';
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
  create: HTMLDivElement;

  constructor(type: string, id: number, label: string, classNames: string[], placeholder: string, value: string) {
    super(type, id, classNames, value, placeholder);
    this.type = type;
    this.id = id;
    this.label = label;
    this.classNames = classNames;
    this.placeholder = placeholder;
    this.value = value;
    this.create = this.createInputBlock();
  }

  createLabel(): HTMLLabelElement {
    const label: HTMLLabelElement = document.createElement('label');
    label.setAttribute('for', this.id.toString());
    label.textContent = this.label;
    return label;
  }

  createErrorBlock(): HTMLSpanElement {
    const error: HTMLSpanElement = document.createElement('span');
    error.classList.add('error-text');
    return error;
  }

  createInputBlock(): HTMLDivElement {
    const wrapper: HTMLDivElement = document.createElement('div');
    wrapper.classList.add('input-wrapper');
    const input = super.createInput();
    input.addEventListener('input', (ev: Event) => {
      input.classList.remove('error');
      this.value = (ev.target as HTMLInputElement).value;
    });

    if (this.type === 'password') {
      const label = this.passwordInput(input);
      wrapper.append(this.createLabel(), input, this.createErrorBlock(), label);
    } else {
      wrapper.append(this.createLabel(), input, this.createErrorBlock());
    }

    return wrapper;
  }

  passwordInput(input: HTMLInputElement): HTMLLabelElement {
    const label: HTMLLabelElement = document.createElement('label');
    const span: HTMLSpanElement = document.createElement('span');
    span.textContent = 'Show password';
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.classList.add('password-checkbox');
    checkbox.addEventListener('click', () => {
      if (input.type === 'password') {
        input.type = 'text';
      } else {
        input.type = 'password';
      }
    });
    label.append(checkbox, span);
    return label;
  }
}
