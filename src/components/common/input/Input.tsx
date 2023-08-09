interface IInput {
  type: string;
  id: string;
  label: string;
  classNames: string[];
  placeholder?: string | undefined;
  value?: string | undefined;
}

export default class Input implements IInput {
  type: string;
  id: string;
  label: string;
  classNames: string[];
  placeholder?: string | undefined;
  value: string | undefined;

  constructor(type: string, id: string, label: string, classNames: string[], placeholder?: string, value?: string) {
    this.type = type;
    this.id = id;
    this.label = label;
    this.classNames = classNames;
    this.placeholder = placeholder;
    this.value = value;
  }

  createLabel() {
    const label: HTMLLabelElement = document.createElement('label');
    label.setAttribute('for', this.id);
    label.textContent = this.label;
    return label;
  }

  createInput() {
    const input: HTMLInputElement = document.createElement('input');
    input.setAttribute('type', this.type);
    input.setAttribute('id', this.id);
    input.classList.add('validate');
    input.classList.add(...this.classNames);
    if (this.placeholder !== undefined) {
      input.setAttribute('placeholder', this.placeholder);
    }
    if (this.value !== undefined) {
      input.setAttribute('value', this.value);
    }
    input.addEventListener('input', () => this.error(input, false));
    return input;
  }

  createErrorBlock() {
    const error: HTMLSpanElement = document.createElement('span');
    error.classList.add('error-text');
    return error;
  }

  highlightError(span: HTMLSpanElement, isError: boolean) {
    if (isError) {
      span.classList.add('visible');
      span.textContent = `Incorrect ${this.type.toLowerCase()}`;
    } else {
      span.classList.remove('visible');
    }
  }

  error(input: HTMLInputElement, isError: boolean) {
    input.classList.remove('error');
    const errorMsg = input.nextElementSibling;
    if (errorMsg !== null) {
      this.highlightError(errorMsg as HTMLSpanElement, isError);
    }
    if (isError) {
      input.classList.add('error');
    }
  }
}
