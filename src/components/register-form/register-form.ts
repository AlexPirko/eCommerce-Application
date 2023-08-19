import './register-form.scss';
import InputBlock from '../common/input/Input-block';
import { IForm } from '@lib/types/input-interface';
import { addressTypes, textInputs } from 'src/lib/types/enum';
import { LoginForm } from '../login-form/login-form';
import { validate } from 'src/lib/utils/validate';
export class RegisterForm extends LoginForm {
  constructor({ titleText, descText, btnText, linkText, redirectText, onSubmit }: IForm) {
    super({ titleText, descText, btnText, linkText, redirectText, onSubmit });
  }

  protected feedForm(): void {
    const { emailInput, passwordInput } = this.createInputElements();

    this.form.append(
      this.createFormTitle(),
      emailInput,
      passwordInput,
      this.userInfo(),
      this.address(addressTypes.BILLING),
      this.address(addressTypes.SHIPPING),
      this.createSubmitBtn(),
      this.registerLink(this.redirectText)
    );
  }

  private address(addressType: string): HTMLDivElement {
    const wrapper: HTMLDivElement = document.createElement('div');
    wrapper.classList.add('address-wrapper', `address__${addressType.toLowerCase()}`);
    const header: HTMLHeadingElement = document.createElement('h4');
    header.classList.add(`${addressType.toLowerCase()}-address__header`);
    header.innerHTML = `${addressType} address`;
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
    const countriesCheckBox: HTMLDivElement = this.countries(addressType);
    const addressCheckboxes: HTMLDivElement = this.getAddressCheckboxes(addressType);
    wrapper.append(
      header,
      streetInput.create,
      cityInput.create,
      postalInput.create,
      countriesCheckBox,
      addressCheckboxes
    );
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

  private countries(addressType: string): HTMLDivElement {
    const wrapper: HTMLDivElement = document.createElement('div');
    const label1: HTMLLabelElement = document.createElement('label');
    const label2: HTMLLabelElement = document.createElement('label');
    const input1: HTMLInputElement = document.createElement('input');
    const input2: HTMLInputElement = document.createElement('input');
    const span1: HTMLSpanElement = document.createElement('span');
    const span2: HTMLSpanElement = document.createElement('span');

    input1.setAttribute('name', `${addressType.toLowerCase()}-country`);
    input1.setAttribute('type', 'radio');
    input1.setAttribute('checked', 'true');

    input2.setAttribute('name', `${addressType.toLowerCase()}-country`);
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

  private getAddressCheckboxes(addressType: string) {
    const wrapper: HTMLDivElement = document.createElement('div');
    const setAsDefaultCheckbox: HTMLDivElement = this.getDefaultAddressCheckbox(addressType);
    const setaAsShippingCheckbox: HTMLDivElement = this.getUseAsShippingCheckbox();

    wrapper.classList.add('address__options');

    wrapper.append(setAsDefaultCheckbox);
    if (addressType === addressTypes.BILLING) wrapper.append(setaAsShippingCheckbox);

    return wrapper;
  }

  private getUseAsShippingCheckbox(): HTMLDivElement {
    const wrapper: HTMLDivElement = document.createElement('div');
    wrapper.classList.add('address__use-as-shipping');
    const label: HTMLLabelElement = document.createElement('label');
    const input: HTMLInputElement = document.createElement('input');
    const span: HTMLSpanElement = document.createElement('span');

    input.setAttribute('name', `use-as-shipping`);
    input.setAttribute('type', 'checkbox');
    input.checked = false;
    input.classList.add('filled-in');

    span.textContent = `Use as shipping address`;

    input.addEventListener('change', function () {
      const shippingAddressContainer: HTMLDivElement | null = document.querySelector('.address__shipping');
      if (shippingAddressContainer) {
        shippingAddressContainer.style.display = this.checked ? 'none' : 'flex';
      }
    });

    label.append(input, span);

    wrapper.append(label);
    return wrapper;
  }

  private getDefaultAddressCheckbox(addressType: string): HTMLDivElement {
    const wrapper: HTMLDivElement = document.createElement('div');
    wrapper.classList.add('default-adress', 'switch');

    const label: HTMLLabelElement = document.createElement('label');
    const input: HTMLInputElement = document.createElement('input');
    const span: HTMLSpanElement = document.createElement('span');

    input.setAttribute('name', `${addressType.toLowerCase()}-address`);
    input.setAttribute('type', 'checkbox');
    input.setAttribute('checked', 'false');

    span.classList.add('lever');

    label.append(input, span, `Set as default address`);

    wrapper.append(label);
    return wrapper;
  }
}
