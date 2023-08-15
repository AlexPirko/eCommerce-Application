import { textInputs } from '../types/enum';

const emailRegex: RegExp = /^\S+@\S+\.\S+$/;
const passwordRegex: RegExp = /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
const noSpecReg: RegExp = /^[a-zA-Zа-яА-ЯёЁ]+$/;
const ruPost: RegExp = /^\d{6}$/;
const usPost: RegExp = /^\d{5}(?:-\d{4})?$/;

class Validate {
  private static instance: Validate;
  private constructor() {}

  public static getInstance(): Validate {
    if (!Validate.instance) {
      Validate.instance = new Validate();
    }
    return Validate.instance;
  }

  public email(value: string): boolean {
    return emailRegex.test(value);
  }

  public password(value: string): boolean {
    return passwordRegex.test(value);
  }

  public postCode(value: string): boolean {
    const ruRadio: HTMLElement | null = document.querySelector('[name="country"]');
    if (ruRadio !== null) {
      return (<HTMLInputElement>ruRadio).checked === true ? ruPost.test(value) : usPost.test(value);
    }
    return true;
  }

  public date(value: string): boolean {
    const currentDate: Date = new Date();
    const birthday: Date = new Date(value);
    const diff = new Date(currentDate.getTime() - birthday.getTime());
    const age = Math.abs(diff.getUTCFullYear() - 1970);
    return age >= 13;
  }

  public noSpec(value: string): boolean {
    return noSpecReg.test(value);
  }
}

export function validate(value: string, input: HTMLInputElement): boolean {
  let isError: boolean = true;

  const validator: Validate = Validate.getInstance();

  if (input.type === 'email') {
    isError = !validator.email(value);
  } else if (input.dataset.type === 'password') {
    isError = !validator.password(value);
  } else if (input.dataset.type) {
    const type = input.dataset.type;
    if (type === textInputs.FIRST || type === textInputs.LAST || type === textInputs.CITY) {
      isError = !validator.noSpec(value);
    } else if (type === textInputs.POST) {
      isError = !validator.postCode(value);
    } else {
      isError = !(value.length > 0);
    }
  } else if (input.type === 'date') {
    isError = !validator.date(value);
  }

  if (isError) {
    input.classList.add('invalid');
    highlightError(isError, input);
  } else {
    input.classList.remove('invalid');
  }

  return !isError;
}

export function highlightError(isError: boolean, input: HTMLInputElement): void {
  const errorEl: Element | null = input.nextElementSibling;
  if (errorEl !== null) {
    if (isError) {
      (errorEl as HTMLSpanElement).classList.add('visible');
      if (input.dataset.type === 'password') {
        errorEl.textContent = passwordErrorMsg(input.value);
      } else if (input.dataset.type === textInputs.POST) {
        errorEl.textContent = postErrorMsg(input.value);
      } else if (input.dataset.type) {
        errorEl.textContent = errorMsg(input.dataset.type);
      } else if (input.type === 'data') {
        errorEl.textContent = errorMsg('date');
      } else {
        errorEl.textContent = errorMsg(input.type);
      }
    } else {
      (errorEl as HTMLSpanElement).classList.remove('visible');
    }
  }
}

function passwordErrorMsg(value: string): string {
  const upperLetter: RegExp = /[A-Z]/;
  const lowerLetter: RegExp = /[a-z]/;
  const number: RegExp = /\d/;
  const symbol: RegExp = /[!@#$%^&*]/;

  if (value.length < 8) {
    return 'Password must be at least 8 characters long';
  } else if (!upperLetter.test(value)) {
    return 'Password must contain at least one uppercase letter(A-Z)';
  } else if (!lowerLetter.test(value)) {
    return 'Password must contain at least one lower letter(a-z)';
  } else if (!number.test(value)) {
    return 'Password must contain at least one digit (0-9)';
  } else if (!symbol.test(value)) {
    return 'Password must contain at least one special character (e.g., !@#$%^&*)';
  } else {
    return 'incorrect password';
  }
}

function postErrorMsg(value: string): string {
  const ruRadio: HTMLElement | null = document.querySelector('[name="country"]');
  if (ruRadio !== null) {
    if ((<HTMLInputElement>ruRadio).checked === true) {
      return 'Post code must be 6 digits';
    } else {
      if (value.length < 5) return 'Post code must be at least 5 digits';
      return 'The index should be in this format: 33130-5678';
    }
  }
  return 'Wrong Post Format';
}

function errorMsg(type: string): string {
  switch (type) {
    case 'email':
      return 'Email address must be properly formatted';
    case textInputs.FIRST:
    case textInputs.LAST:
    case textInputs.CITY:
      return "There shouldn't be any special characters or numbers";
    case textInputs.POST:
      return 'Wrong Post Format';
    case 'date':
      return 'You have to be older 13 years';
    default:
      return 'Incorrect format';
  }
}
