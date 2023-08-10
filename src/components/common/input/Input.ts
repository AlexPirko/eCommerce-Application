interface IInput {
  type: string;
  id: number;
  classNames: string[];
  value: string;
  placeholder: string;
}

export class Input implements IInput {
  type: string;
  id: number;
  classNames: string[];
  placeholder: string;
  value: string;

  constructor(type: string, id: number, classNames: string[], placeholder: string, value: string) {
    this.type = type;
    this.id = id;
    this.classNames = classNames;
    this.placeholder = placeholder;
    this.value = value;
  }

  createInput(errorFunc: (isError: boolean) => void): HTMLInputElement {
    const input: HTMLInputElement = document.createElement('input');
    input.setAttribute('type', this.type);
    input.setAttribute('id', this.id.toString());
    input.classList.add('validate');
    // input.classList.add(...this.classNames);
    if (this.placeholder !== undefined) {
      input.setAttribute('placeholder', this.placeholder);
    }
    if (this.value !== undefined) {
      input.setAttribute('value', this.value);
    }
    input.addEventListener('input', () => {
      this.value = input.value;
      errorFunc(false);
    });
    return input;
  }
}
