import './RegisterForm.scss';
import InputBlock from '../input/InputBlock';
import { SigninForm } from '../signinForm/SigninForm';
import { IForm } from 'src/lib/types/interfaces';

export class RegisterForm extends SigninForm {
  constructor({ titleText, descText, btnText, linkText, onSubmit }: IForm) {
    super({ titleText, descText, btnText, linkText, onSubmit });
  }

  public createForm(): HTMLFormElement {
    const form: HTMLFormElement = document.createElement('form');
    form.classList.add('form');
    form.setAttribute('novalidate', '');
    const emailInput: InputBlock = new InputBlock({
      type: 'email',
      id: 1,
      label: 'Email',
      classNames: [''],
      placeholder: 'Enter your email',
      value: '',
    });
    const passwordInput: InputBlock = new InputBlock({
      type: 'password',
      id: 2,
      label: 'Password',
      classNames: [''],
      placeholder: 'Enter your password',
      value: '',
    });
    form.append(
      this.createFormTitle(),
      emailInput.create,
      passwordInput.create,
      this.createSubmitBtn(),
      this.registerLink()
    );

    form.addEventListener('submit', (ev: SubmitEvent): void => {
      ev.preventDefault();
      const isValid: boolean = this.validateForm(form);
      if (isValid) {
        console.log('validation complete');
      }
    });
    return form;
  }
}
