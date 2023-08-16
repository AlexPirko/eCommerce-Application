import './register-form.scss';
import InputBlock from '../common/input/Input-block';
import { IForm } from 'src/lib/types/interfaces';
import { textInputs } from 'src/lib/types/enum';
import { LoginForm } from '../login-form/login-form';
import { validate } from 'src/lib/utils/validate';
export class RegisterForm extends LoginForm {
  constructor({ titleText, descText, btnText, linkText, redirectText, onSubmit }: IForm) {
    super({ titleText, descText, btnText, linkText, redirectText, onSubmit });
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
      this.userInfo(),
      this.address(),
      this.createSubmitBtn(),
      this.registerLink(this.redirectText)
    );
    form.addEventListener('submit', (ev: SubmitEvent): void => {
      ev.preventDefault();
      const isValid: boolean = this.validateForm(form);
      if (isValid) {
        console.log('validation complete');
        this.onSubmit();
      }
    });
    return form;
  }

  private address(): HTMLDivElement {
    const wrapper: HTMLDivElement = document.createElement('div');
    wrapper.classList.add('addressWrapper');

    const streetInput: InputBlock = new InputBlock({
      type: 'text',
      id: 8,
      label: textInputs.STREET,
      classNames: [''],
      placeholder: 'Street',
      value: '',
    });

    const cityInput: InputBlock = new InputBlock({
      type: 'text',
      id: 9,
      label: textInputs.CITY,
      classNames: [''],
      placeholder: 'City',
      value: '',
    });
    const postalInput: InputBlock = new InputBlock({
      type: 'text',
      id: 10,
      label: `${textInputs.POST} Code`,
      classNames: [''],
      placeholder: 'Postal Code',
      value: '',
    });

    wrapper.append(streetInput.create, cityInput.create, postalInput.create, this.countries());
    return wrapper;
  }

  private userInfo(): DocumentFragment {
    const fragment: DocumentFragment = new DocumentFragment();
    const firstNameInput: InputBlock = new InputBlock({
      type: 'text',
      id: 5,
      label: `${textInputs.FIRST} Name`,
      classNames: [''],
      placeholder: 'Enter your First Name',
      value: '',
    });

    const lastNameInput: InputBlock = new InputBlock({
      type: 'text',
      id: 6,
      label: `${textInputs.LAST} Name`,
      classNames: [''],
      placeholder: 'Enter your Last Name',
      value: '',
    });
    const date: Date = new Date();
    const dateInput: InputBlock = new InputBlock({
      type: 'date',
      id: 7,
      label: `${textInputs.DATE} of Birth`,
      classNames: [''],
      placeholder: date.toLocaleDateString('Ru-ru'),
      value: '',
    });
    fragment.append(firstNameInput.create, lastNameInput.create, dateInput.create);
    return fragment;
  }

  private countries(): HTMLDivElement {
    const wrapper: HTMLDivElement = document.createElement('div');
    const label1: HTMLLabelElement = document.createElement('label');
    const label2: HTMLLabelElement = document.createElement('label');
    const input1: HTMLInputElement = document.createElement('input');
    const input2: HTMLInputElement = document.createElement('input');
    const span1: HTMLSpanElement = document.createElement('span');
    const span2: HTMLSpanElement = document.createElement('span');

    input1.setAttribute('name', 'country');
    input1.setAttribute('type', 'radio');
    input1.setAttribute('checked', 'true');

    input2.setAttribute('name', 'country');
    input2.setAttribute('type', 'radio');

    function onChange(): void {
      const postInput: Element | null = document.querySelector(`[data-type="${textInputs.POST}"]`);
      if (postInput !== null) {
        validate((<HTMLInputElement>postInput).value, <HTMLInputElement>postInput);
      }
    }

    input1.addEventListener('change', onChange);
    input2.addEventListener('change', onChange);

    span1.textContent = 'Russia';
    span2.textContent = 'USA';

    label1.append(input1, span1);
    label2.append(input2, span2);

    wrapper.append(label1, label2);
    return wrapper;
  }
}
