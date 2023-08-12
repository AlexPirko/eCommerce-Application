const emailRegex: RegExp = /^[^\s]+@\S+\.\S+$/gm;
// const emailRegex: RegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex: RegExp = /hh/;

class EmailValidate {
  validate(value: string) {
    console.log(value);
    return emailRegex.test(value);
  }
}

class PasswordValidate {
  validate(value: string) {
    return passwordRegex.test(value);
  }
}

export function validate(value: string, input: HTMLInputElement) {
  let isError = false;
  if (input.type === 'email') {
    isError = new EmailValidate().validate(value);
    console.log(isError);
  } else {
    isError = new PasswordValidate().validate(value);
  }
  if (!isError) {
    input.classList.add('invalid');
    highlightError(!isError, input);
  } else {
    input.classList.remove('invalid');
  }
  return !isError;
}

export function highlightError(isError: boolean, input: HTMLInputElement): void {
  const errorEl = input.nextSibling;
  if (errorEl !== null) {
    if (isError) {
      (errorEl as HTMLSpanElement).classList.add('visible');
      errorEl.textContent = `Incorrect ${input.type.toLowerCase()}`;
    } else {
      (errorEl as HTMLSpanElement).classList.remove('visible');
    }
  }
}

// function error(isError: boolean, input: HTMLInputElement): void {
//   // console.log(input);
//   if (input !== null) {
//     input.classList.remove('error');
//     this.highlightError(isError, input);
//     console.log('check');
//     if (isError) {
//       input.classList.add('error');
//     }
//   }
// }
