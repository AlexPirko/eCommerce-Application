import './input.scss';
import { Input } from './Input';
import { IInputBlock } from 'src/lib/types/interfaces';

export default class InputBlock extends Input implements IInputBlock {
  label: string;
  create: HTMLDivElement;

  constructor({ type, id, label, classNames, placeholder, value }: IInputBlock) {
    super({ type, id, classNames, placeholder, value });
    this.label = label;
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

    const input: HTMLInputElement = this.getInputElement();
    input.addEventListener('input', this.handleInput.bind(this, input));

    const label: HTMLLabelElement | null = this.type === 'password' ? this.passwordInput(input) : null;

    wrapper.append(this.createLabel(), input, this.createErrorBlock());
    if (label !== null) wrapper.append(label);
    return wrapper;
  }

  handleInput(input: HTMLInputElement) {
    input.classList.remove('error');
    this.value = input.value;
  }

  passwordInput(input: HTMLInputElement): HTMLLabelElement {
    input.setAttribute('data-type', 'password');

    const label: HTMLLabelElement = document.createElement('label');
    label.classList.add('password');

    const checkbox: HTMLInputElement = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.classList.add('password-checkbox');
    checkbox.addEventListener('click', () => {
      input.type = input.type === 'password' ? 'text' : 'password';
    });

    const span: HTMLSpanElement = document.createElement('span');
    span.textContent = 'Show password';

    label.append(checkbox, span);
    return label;
  }
}
