import './login-form.scss';
import InputBlock from '../common/input/Input-block';
import { IForm } from '@lib/types/input-interface';
import ApiServices from '@lib/api/api-services';
import Toastify from 'toastify';
export class LoginForm {
  protected titleText: string;
  protected descText: string;
  protected btnText: string;
  protected linkText: string;
  protected redirectText: string;
  protected onSubmit: () => void;

  constructor({ titleText, descText, btnText, linkText, redirectText, onSubmit }: IForm) {
    this.titleText = titleText;
    this.descText = descText;
    this.btnText = btnText;
    this.linkText = linkText;
    this.redirectText = redirectText;
    this.onSubmit = onSubmit;
  }

  protected createSubmitBtn(): HTMLButtonElement {
    const btn: HTMLButtonElement = document.createElement('button');
    btn.classList.add('btn', 'waves-effect', 'waves-light');
    btn.textContent = this.btnText;
    return btn;
  }

  protected createFormTitle(): DocumentFragment {
    const fragment: DocumentFragment = new DocumentFragment();
    const title: HTMLHeadingElement = document.createElement('h3');
    title.textContent = this.titleText;

    const desc: HTMLParagraphElement = document.createElement('p');
    desc.textContent = this.descText;

    fragment.append(title, desc);
    return fragment;
  }

  protected validateForm(form: HTMLFormElement): boolean {
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

  // eslint-disable-next-line max-lines-per-function
  public createForm(): HTMLFormElement {
    const form: HTMLFormElement = document.createElement('form');
    form.classList.add('form');
    form.setAttribute('novalidate', '');
    const emailInput: InputBlock = new InputBlock({
      type: 'email',
      id: 3,
      label: 'Email',
      classNames: [''],
      placeholder: 'Enter your email',
      value: '',
    });
    const passwordInput: InputBlock = new InputBlock({
      type: 'password',
      id: 4,
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
      this.registerLink(this.redirectText)
    );

    // eslint-disable-next-line max-lines-per-function
    form.addEventListener('submit', async (ev: SubmitEvent): Promise<void> => {
      ev.preventDefault();
      const isValid: boolean = this.validateForm(form);
      if (isValid) {
        const formData: FormData = new FormData(form);
        const email: string = String(formData.get('email'));
        const password: string = String(formData.get('password'));

        const api = new ApiServices();
        if (email !== undefined && password !== undefined) {
          api
            .customerLogin({ email, password })
            .then((res) => {
              console.log(res);
              // if (res.statusCode !== undefined && res.statusCode >= 400 && res.statusCode < 500) console.log(res);
              // else {
              //   console.log(res);
              // }
              this.onSubmit();
            })
            .catch((error) => {
              console.log(error.message);
              Toastify.success(error.message, '');
              Toastify.setOption('position', 'top-right');
            });
        }
      }
    });
    return form;
  }

  protected registerLink(redirectText: string): HTMLParagraphElement {
    const text: HTMLParagraphElement = document.createElement('p');
    text.textContent = this.linkText;
    const link: HTMLAnchorElement = document.createElement('a');
    link.setAttribute('href', `http://${window.location.host}/${redirectText}`);
    link.textContent = 'here';
    text.append(link);
    return text;
  }
}
