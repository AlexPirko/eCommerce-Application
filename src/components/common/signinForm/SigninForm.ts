import './SigninForm.scss';
import InputBlock from '../input/InputBlock';

export class SigninForm {
  private titleText: string;
  private descText: string;
  private btnText: string;

  constructor(titleText: string, descText: string, btnText: string) {
    this.titleText = titleText;
    this.descText = descText;
    this.btnText = btnText;
  }

  private createSubmitBtn(): HTMLButtonElement {
    const btn: HTMLButtonElement = document.createElement('button');
    btn.classList.add('btn', 'waves-effect', 'waves-light');
    btn.textContent = this.btnText;
    return btn;
  }

  private createFormTitle(): DocumentFragment {
    const fragment: DocumentFragment = new DocumentFragment();
    const title: HTMLHeadingElement = document.createElement('h3');
    title.textContent = this.titleText;

    const desc: HTMLParagraphElement = document.createElement('p');
    desc.textContent = this.descText;

    fragment.append(title, desc);
    return fragment;
  }

  private validateForm(form: HTMLFormElement): boolean {
    const inputs: NodeListOf<HTMLInputElement> = form.querySelectorAll('input');
    let valid: boolean = true;
    inputs.forEach((input: HTMLInputElement): void => {
      if (input.value.trim().length === 0) {
        input.classList.add('invalid');
        valid = false;
      }
    });
    return valid;
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

  private registerLink(): HTMLParagraphElement {
    const text: HTMLParagraphElement = document.createElement('p');
    text.textContent = "Don't have an account ? Register ";
    const link: HTMLAnchorElement = document.createElement('a');
    link.setAttribute('href', '#');
    link.textContent = 'here';
    text.append(link);
    return text;
  }
}
