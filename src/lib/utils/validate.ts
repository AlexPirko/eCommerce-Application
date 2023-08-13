const emailRegex: RegExp = /^\S+@\S+\.\S+$/;
const passwordRegex: RegExp = /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

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
}

export function validate(value: string, input: HTMLInputElement): boolean {
  let isError = true;

  const validator = Validate.getInstance();

  if (input.type === 'email') {
    isError = !validator.email(value);
  } else if (input.type === 'password') {
    isError = !validator.password(value);
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
        errorEl.textContent = inputErrorMsg(input.value);
      } else {
        errorEl.textContent = errorMsg(input.type);
      }
    } else {
      (errorEl as HTMLSpanElement).classList.remove('visible');
    }
  }
}

function inputErrorMsg(value: string): string {
  const upperLetter = /[A-Z]/;
  const lowerLetter = /[a-z]/;
  const number = /\d/;
  const symbol = /[!@#$%^&*]/;

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

function errorMsg(type: string): string {
  switch (type) {
    case 'email':
      return 'Email address must be properly formatted';
    default:
      return 'Incorrect format';
  }
}
