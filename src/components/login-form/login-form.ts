import './login-form.scss';
import M from 'materialize-css'; // Импорт объекта M из библиотеки Materialize
import 'materialize-css/dist/css/materialize.min.css';
// import toggleNavBtn from '@lib/utils/toggleNavBtn';
// import blockMainLink from '@lib/utils/block-main-link';
import InputBlock from '../common/input/Input-block';
import { IForm } from '@lib/types/input-interface';
import ApiServices from '@lib/api/api-services';
// import Router from '@components/router/router';

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

    form.addEventListener('submit', async (ev: SubmitEvent): Promise<void> => {
      ev.preventDefault();
      this.submitForm(form);
    });
    return form;
  }

  public submitForm(form: HTMLFormElement): void {
    const isValid: boolean = this.validateForm(form);
    if (isValid) {
      // const router: Router = new Router(null);
      const formData: FormData = new FormData(form);
      const email: string = String(formData.get('email'));
      const password: string = String(formData.get('password'));
      const api: ApiServices = new ApiServices();

      if (email !== undefined && password !== undefined) {
        api
          .customerLogin({ email, password })
          .then((res) => {
            console.log(res);
            this.onSubmit();
            localStorage.setItem('login', 'true');
            document.location.href = `http://${window.location.host}`;
            M.toast({ html: 'You are successfuly login', classes: 'rounded' });
          })
          .catch((error) => {
            M.AutoInit();
            M.toast({ html: error.message, classes: 'rounded' });
          });
      }
    }
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
