import './login-form.scss';
import InputBlock from '../common/input/Input-block';
import { IForm } from '@lib/types/input-interface';
import createHTMLElement from '@lib/utils/create-html-element';

export class LoginForm {
  protected readonly form: HTMLFormElement;
  protected titleText: string;
  protected descText: string;
  protected btnText: string;
  protected linkText: string;
  protected redirectText: string;
  protected onSubmit: () => void;

  constructor({ titleText, descText, btnText, linkText, redirectText, onSubmit }: IForm) {
    this.form = createHTMLElement('form', ['form'], { novalidate: '' });
    this.titleText = titleText;
    this.descText = descText;
    this.btnText = btnText;
    this.linkText = linkText;
    this.redirectText = redirectText;
    this.onSubmit = onSubmit;
    this.feedForm();
    this.setFormSubmitEventHandler();
  }

  protected createSubmitBtn(): HTMLButtonElement {
    const btnParams = {
      tag: 'button',
      classes: ['btn', 'waves-effect', 'waves-light'],
    };
    const btn: HTMLButtonElement = createHTMLElement(btnParams.tag, btnParams.classes);
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

  protected createInputElements(): { emailInput: HTMLDivElement; passwordInput: HTMLDivElement } {
    const emailInput: HTMLDivElement = new InputBlock({
      type: 'email',
      id: 3,
      label: 'Email',
      placeholder: 'Enter your email',
      name: 'email',
    }).create;

    const passwordInput: HTMLDivElement = new InputBlock({
      type: 'password',
      id: 4,
      label: 'Password',
      placeholder: 'Enter your password',
      name: 'password',
    }).create;

    return { emailInput, passwordInput };
  }

  protected feedForm(): void {
    const { emailInput, passwordInput } = this.createInputElements();

    this.form.append(
      this.createFormTitle(),
      emailInput,
      passwordInput,
      this.createSubmitBtn(),
      this.registerLink(this.redirectText)
    );
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

  protected setFormSubmitEventHandler() {
    this.form.addEventListener('submit', (ev: SubmitEvent): void => {
      ev.preventDefault();
      const isValid: boolean = this.validateForm(this.form);
      if (isValid) {
        console.log('validation complete');
        const formData: FormData = new FormData(this.form);
        console.log(formData);
        this.onSubmit();
      }
    });
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

  public getElement() {
    return this.form;
  }
}
