import InputBlock from '../input/InputBlock';
import './SigninForm.scss';
import { validate } from 'src/lib/utils/validate';

export class SigninForm {
  titleText: string;
  descText: string;
  btnText: string;

  constructor(titleText: string, descText: string, btnText: string) {
    this.titleText = titleText;
    this.descText = descText;
    this.btnText = btnText;
  }

  createSubmitBtn() {
    const btn = document.createElement('button');
    btn.classList.add('btn', 'waves-effect', 'waves-light');
    btn.textContent = this.btnText;
    return btn;
  }

  createFormTitle() {
    const fragment: DocumentFragment = new DocumentFragment();
    const title: HTMLHeadingElement = document.createElement('h3');
    title.textContent = this.titleText;

    const desc: HTMLParagraphElement = document.createElement('p');
    desc.textContent = this.descText;

    fragment.append(title, desc);
    return fragment;
  }

  createForm(): HTMLFormElement {
    const form: HTMLFormElement = document.createElement('form');
    form.classList.add('form');
    form.setAttribute('novalidate', '');
    const emailInput = new InputBlock('email', 1, 'Email', [''], 'Enter your email', '');
    const passwordInput = new InputBlock('password', 2, 'Password', [''], 'Enter your password', '');
    form.append(this.createFormTitle(), emailInput.create, passwordInput.create, this.createSubmitBtn());

    form.addEventListener('submit', (ev: SubmitEvent) => {
      ev.preventDefault();
      const inputs = form.querySelectorAll('input');

      inputs.forEach((input: HTMLInputElement) => {
        validate(input.value, input);
      });
      console.log(inputs);
      const errors = Array.from(inputs).every((input: HTMLInputElement) => !input.classList.contains('invalid'));

      if (errors) {
        console.log('validation complete');
      } else {
        console.log('validation incomplete');
      }
    });

    return form;
  }
}
