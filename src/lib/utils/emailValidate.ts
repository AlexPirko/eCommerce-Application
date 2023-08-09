const emailRegex: RegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export default class EmailValidate {
  validate(value: string) {
    return emailRegex.test(value);
  }
}
