const passwordRegex: RegExp = /hh/;

export default class PasswordValidate {
  validate(value: string) {
    return passwordRegex.test(value);
  }
}
