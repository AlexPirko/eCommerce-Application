import './register-form.scss';
import handleVisibility from '@lib/utils/handle-visibility';
import InputBlock from '../common/input/Input-block';
import { IForm } from '@lib/types/input-interface';
import { addressTypes, textInputs } from 'src/lib/types/enum';
import { LoginForm } from '../login-form/login-form';
import { validate } from 'src/lib/utils/validate';
import { CustomerDraft } from '@commercetools/platform-sdk';
import { getFormFieldsAsCustomerDraft } from '@lib/utils/get-form-fields';
import ApiServices from '@lib/api/api-services';
import Router from '@components/router/router';
import { Paths } from '@components/router/paths';

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

  public setFormSubmitEventHandler() {
    this.form.addEventListener('submit', async (ev: SubmitEvent): Promise<void> => {
      ev.preventDefault();
      const isValid: boolean = this.validateForm(this.form);
      if (isValid) {
        M.AutoInit();
        const api: ApiServices = new ApiServices();
        const router: Router = new Router(null);
        const customerDraft: CustomerDraft = getFormFieldsAsCustomerDraft(this.form);
        const { email, password } = customerDraft;
        api
          .createCustomer(customerDraft)
          .then(() => {
            api
              .customerLogin({ email: email, password: password as string })
              .then(() => {
                localStorage.setItem('login', 'true');
                handleVisibility();
                router.navigate(`${Paths.MAIN}`);
              })
              .catch((error) => {
                throw error;
              });
            M.toast({ html: 'You are successfuly login', classes: 'rounded' });
          })
          .catch((error) => {
            M.toast({ html: error.message, classes: 'rounded' });
          });
      }
    });
  }

  private address(addressType: string): HTMLDivElement {
    const wrapper: HTMLDivElement = document.createElement('div');
    wrapper.classList.add('address-wrapper', `address__${addressType.toLowerCase()}`);
    const header: HTMLHeadingElement = document.createElement('h4');
    header.classList.add(`${addressType.toLowerCase()}-address__header`);
    header.innerHTML = `${addressType} address`;
    const streetInput: InputBlock = new InputBlock({
      id: `${addressType.toLowerCase()}Street`,
      label: textInputs.STREET,
      placeholder: 'Street',
      name: `${addressType.toLowerCase()}-street`,
      disabled: false,
    });
    const cityInput: InputBlock = new InputBlock({
      id: `${addressType.toLowerCase()}City`,
      label: textInputs.CITY,
      placeholder: 'City',
      name: `${addressType.toLowerCase()}-city`,
      disabled: false,
    });
    const postalInput: InputBlock = new InputBlock({
      id: `${addressType.toLowerCase()}Postal`,
      label: `${textInputs.POST} Code`,
      placeholder: 'Postal Code',
      name: `${addressType.toLowerCase()}-postal`,
      disabled: false,
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
      id: 5,
      label: `${textInputs.FIRST} Name`,
      placeholder: 'Enter your First Name',
      disabled: false,
      name: 'firstName',
    });

    const lastNameInput: InputBlock = new InputBlock({
      id: 6,
      label: `${textInputs.LAST} Name`,
      placeholder: 'Enter your Last Name',
      name: 'lastName',
      disabled: false,
    });
    const date: Date = new Date();
    const dateInput: InputBlock = new InputBlock({
      type: 'date',
      id: 7,
      label: `${textInputs.DATE} of Birth`,
      placeholder: date.toLocaleDateString('Ru-ru'),
      name: `dateOfBirth`,
      disabled: false,
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
    input1.setAttribute('value', 'RU');

    input2.setAttribute('name', `${addressType.toLowerCase()}-country`);
    input2.setAttribute('type', 'radio');
    input2.setAttribute('value', 'US');

    function onChange(input: HTMLInputElement): void {
      const name: 'billing-postal' | 'shipping-postal' =
        input.name === 'billing-country' ? 'billing-postal' : 'shipping-postal';
      const postInput: Element | null = document.querySelector(`[name=${name}]`);
      if (postInput !== null) {
        validate((<HTMLInputElement>postInput).value, <HTMLInputElement>postInput);
      }
    }

    input1.addEventListener('change', () => onChange(input1));
    input2.addEventListener('change', () => onChange(input2));

    span1.textContent = 'Russia';
    span2.textContent = 'USA';

    label1.append(input1, span1);
    label2.append(input2, span2);

    wrapper.append(label1, label2);
    return wrapper;
  }

  private getAddressCheckboxes(addressType: string) {
    const container: HTMLDivElement = document.createElement('div');
    const setAsDefaultCheckbox: HTMLDivElement = this.getDefaultAddressCheckbox(addressType);
    const setaAsShippingCheckbox: HTMLDivElement = this.getUseAsShippingCheckbox();

    container.classList.add('address__options');

    container.append(setAsDefaultCheckbox);
    if (addressType === addressTypes.BILLING) container.append(setaAsShippingCheckbox);

    return container;
  }

  private getUseAsShippingCheckbox(): HTMLDivElement {
    const container: HTMLDivElement = document.createElement('div');
    container.classList.add('address__use-as-shipping');
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
        this.checked
          ? shippingAddressContainer.classList.add('none')
          : shippingAddressContainer.classList.remove('none');
      }
    });

    label.append(input, span);

    container.append(label);
    return container;
  }

  private getDefaultAddressCheckbox(addressType: string): HTMLDivElement {
    const container: HTMLDivElement = document.createElement('div');
    container.classList.add('default-address', 'switch');

    const label: HTMLLabelElement = document.createElement('label');
    const input: HTMLInputElement = document.createElement('input');
    const span: HTMLSpanElement = document.createElement('span');

    input.setAttribute('name', `default${addressType}Address`);
    input.setAttribute('type', 'checkbox');
    input.setAttribute('checked', 'false');

    span.classList.add('lever');

    label.append(input, span, `Set as default address`);

    container.append(label);
    return container;
  }
}
