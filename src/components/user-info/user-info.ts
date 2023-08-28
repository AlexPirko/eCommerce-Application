/* eslint-disable max-lines-per-function */
import './user-info';
import InputBlock from '@components/common/input/Input-block';
import ApiServices from '@lib/api/api-services';
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import { Customer, ClientResponse, Address } from '@commercetools/platform-sdk';
import { TUserInfo, TAddressInfo, TBillingAddressesInfo, TShippingAddressesInfo } from '@lib/types/user-info-types';
import './user-info.scss';

export class UserInfo {
  services: ApiServices;
  constructor() {
    this.services = new ApiServices();
  }

  async getInfo(): Promise<Customer> {
    const res: ClientResponse<Customer> = await this.services.getCurrentCustomer();
    return res.body;
  }

  async createUserInfoPage(): Promise<HTMLDivElement> {
    const wrapper: HTMLDivElement = document.createElement('div');
    try {
      const res: Customer = await this.getInfo();
      console.log(res);
      wrapper.append(
        await this.createUserInfoBlock(res),
        await this.createPasswordBlock(res),
        await this.createAdressesBlock(res)
      );
      return wrapper;
    } catch (er) {
      console.log(er);
      const title: HTMLHeadElement = document.createElement('h5');
      title.textContent = 'Something went wrong, please visit this page later';
      wrapper.append(title);
      return wrapper;
    }
  }

  async createUserInfoBlock({
    email,
    firstName,
    lastName,
    dateOfBirth,
    version,
    id,
  }: TUserInfo): Promise<HTMLFormElement> {
    const formUserInfo: HTMLFormElement = document.createElement('form');
    formUserInfo.classList.add('user-info');
    const title: HTMLHeadElement = document.createElement('h5');
    title.textContent = 'Personal Information';
    formUserInfo.append(title);

    if (email !== undefined) {
      const emailInput: HTMLDivElement = new InputBlock({
        type: 'email',
        id: 'emailInput',
        label: 'Email',
        placeholder: '',
        name: 'email',
        value: email,
        disabled: true,
      }).create;
      formUserInfo.append(emailInput);
    }
    if (firstName !== undefined) {
      const nameInput: HTMLDivElement = new InputBlock({
        type: 'text',
        id: 'nameInput',
        label: 'First Name',
        placeholder: '',
        name: 'firstName',
        value: firstName,
        disabled: true,
      }).create;
      formUserInfo.append(nameInput);
    }
    if (lastName !== undefined) {
      const surnameInput: HTMLDivElement = new InputBlock({
        type: 'text',
        id: 'lastNameInput',
        label: 'Last Name',
        placeholder: '',
        name: 'lastName',
        value: lastName,
        disabled: true,
      }).create;
      formUserInfo.append(surnameInput);
    }
    if (dateOfBirth !== undefined) {
      const dateInput: HTMLDivElement = new InputBlock({
        type: 'date',
        id: 'dateOfBirth',
        label: 'Date of Birth',
        placeholder: '',
        name: 'dateOfBirth',
        value: dateOfBirth,
        disabled: true,
      }).create;
      formUserInfo.append(dateInput);
    }

    const btnText: string = 'personal info';
    const btn: HTMLButtonElement = await this.createEditBtn({ text: `${btnText}` });
    formUserInfo.append(btn);

    formUserInfo.addEventListener('submit', async (ev: SubmitEvent): Promise<void> => {
      ev.preventDefault();
      if (btn.textContent === `Save ${btnText}`) {
        await this.saveEdit(formUserInfo, btn, id, version, `${btnText}`);
      } else {
        this.editMode(formUserInfo);
        btn.textContent = `Save ${btnText}`;
      }
    });
    return formUserInfo;
  }

  async createEditBtn({ text }: { text: string }): Promise<HTMLButtonElement> {
    const btn: HTMLButtonElement = document.createElement('button');
    btn.classList.add('waves-effect', 'waves-light', 'btn', 'edit-btn');
    btn.innerHTML = `
    <i class="material-icons left">edit</i> Edit ${text}`;
    return btn;
  }

  editMode(form: HTMLFormElement) {
    const inputs: NodeListOf<HTMLInputElement> = form.querySelectorAll('input');
    inputs.forEach((input: HTMLInputElement): void => {
      input.removeAttribute('disabled');
    });
    const btns: NodeListOf<HTMLButtonElement> = form.querySelectorAll('button');
    btns.forEach((button: HTMLButtonElement) => (button.disabled = false));
  }

  async saveEdit(
    form: HTMLFormElement,
    btn: HTMLButtonElement,
    id: string,
    version: number,
    text: string
  ): Promise<void> {
    M.AutoInit();
    const formData: FormData = new FormData(form);
    const inputs: NodeListOf<HTMLInputElement> = form.querySelectorAll('input');
    const btns: NodeListOf<HTMLButtonElement> = form.querySelectorAll('button');
    const noErrors: boolean = Array.from(inputs).every(
      (input: HTMLInputElement) => !input.classList.contains('invalid')
    );
    if (noErrors) {
      btn.innerHTML = `
    <i class="material-icons left">edit</i> Edit ${text}`;
      inputs.forEach((input: HTMLInputElement): void => {
        input.setAttribute('disabled', 'true');
        input.classList.remove('valid');
      });
      btns.forEach((button: HTMLButtonElement, index: number): void => {
        if (index !== btns.length - 1) button.disabled = true;
      });

      this.services
        .updateCustomer(id, {
          version,
          actions: [
            {
              action: 'changeEmail',
              email: String(formData.get('email')),
            },
            {
              action: 'setFirstName',
              firstName: String(formData.get('firstName')),
            },
            {
              action: 'setLastName',
              lastName: String(formData.get('lastName')),
            },
            {
              action: 'setDateOfBirth',
              dateOfBirth: String(formData.get('dateOfBirth')),
            },
          ],
        })
        .then((): void => {
          M.toast({ html: 'Successfully changed info', classes: 'rounded' });
        })
        .catch((er): void => {
          console.log(er);
          M.toast({ html: er.message, classes: 'rounded' });
        });
    }
  }

  async createAdressesBlock(res: Customer): Promise<HTMLFormElement> {
    const adressesForm: HTMLFormElement = document.createElement('form');
    const title: HTMLHeadElement = document.createElement('h5');
    title.textContent = 'Addresses Information';
    const addressesWrapper: HTMLDivElement = document.createElement('div');
    addressesWrapper.append(this.createBillingAdresses(res), this.createShippingAdresses(res));
    adressesForm.append(title, addressesWrapper);
    const submitText: string = 'addresses information';
    const submitBtn: HTMLButtonElement = await this.createEditBtn({ text: submitText });
    adressesForm.append(submitBtn);
    adressesForm.addEventListener('submit', async (ev: SubmitEvent): Promise<void> => {
      ev.preventDefault();
      if (submitBtn.textContent === `Save ${submitText}`) {
        await this.saveEdit(adressesForm, submitBtn, res.id, res.version, `${submitText}`);
      } else {
        this.editMode(adressesForm);
        submitBtn.textContent = `Save ${submitText}`;
      }
    });
    return adressesForm;
  }

  createAddressBlock(
    { country, city, streetName, postalCode, id }: TAddressInfo,
    isDefault: boolean,
    index: number,
    type: 'billing' | 'shipping'
  ): HTMLDivElement {
    const wrapper: HTMLDivElement = document.createElement('div');
    wrapper.classList.add('address-wrapper');
    if (id !== undefined) wrapper.setAttribute('data-id', id);
    const title: HTMLHeadElement = document.createElement('h5');
    title.textContent = `Address №${index}`;

    if (country !== undefined) {
      const countries: string = `
      <div>
        <span>
          <label>
            <input name=${id} value="US" type="radio" ${country === 'RU' ? 'checked' : ''} disabled />
            <span>Russia</span>
          </label>
        </span>
        <span>
          <label>
            <input name=${id} value="RU" type="radio"${country === 'US' ? 'checked' : ''} disabled />
            <span>USA</span>
          </label>
        </span>
      </div>`;
      wrapper.insertAdjacentHTML('afterbegin', countries);
    }
    if (city !== undefined) {
      const cityInput: HTMLDivElement = new InputBlock({
        type: 'text',
        id: '',
        label: 'City',
        placeholder: '',
        name: 'city',
        value: city,
        disabled: true,
      }).create;
      wrapper.append(cityInput);
    }
    if (streetName !== undefined) {
      const streetInput: HTMLDivElement = new InputBlock({
        type: 'text',
        id: '',
        label: 'Street',
        placeholder: '',
        name: 'streetName',
        value: streetName,
        disabled: true,
      }).create;
      wrapper.append(streetInput);
    }
    if (postalCode !== undefined) {
      const postalCodeInput: HTMLDivElement = new InputBlock({
        type: 'text',
        id: '',
        label: 'Postal Code',
        placeholder: '',
        name: 'postalCode',
        value: postalCode,
        disabled: true,
      }).create;
      wrapper.append(postalCodeInput);
    }
    const defaultRadio: string = `
    <p>
      <label>
        <input name=${type === 'billing' ? 'defaultBilling' : 'defaultShipping'} type="radio" disabled ${
          isDefault ? 'checked' : ''
        }/>
        <span>${type === 'billing' ? 'Default Billing Address' : 'Default Shipping Address'}</span>
      </label>
    </p>`;
    wrapper.insertAdjacentHTML('afterbegin', defaultRadio);
    if (isDefault) {
      wrapper.style.backgroundColor = 'aquamarine';
      const addBtn: HTMLButtonElement = document.createElement('button');
      addBtn.textContent = `Add new ${type} Address`;
      addBtn.classList.add('waves-effect', 'waves-light', 'btn');
      addBtn.disabled = true;
      addBtn.addEventListener('click', (ev: MouseEvent) => {
        ev.preventDefault();
        this.addNewAddress(type, addBtn);
      });
      wrapper.append(addBtn);
    }
    return wrapper;
  }

  addNewAddress(type: 'billing' | 'shipping', btn: HTMLButtonElement) {
    const newAddress = this.createAddressBlock(
      { country: '', city: '', streetName: '', postalCode: '' },
      false,
      5,
      type
    );
    btn.parentElement?.insertAdjacentElement('afterend', newAddress);
    const inputs = newAddress.querySelectorAll('input');
    inputs.forEach((input: HTMLInputElement) => {
      input.removeAttribute('disabled');
    });
  }

  createBillingAdresses({
    addresses,
    billingAddressIds,
    defaultBillingAddressId,
  }: TBillingAddressesInfo): HTMLDivElement {
    const wrapper: HTMLDivElement = document.createElement('div');
    wrapper.classList.add('addresses-wrapper');
    const title: HTMLHeadingElement = document.createElement('h5');
    title.textContent = 'Billing Address(es)';

    wrapper.append(title);

    if (addresses !== undefined && billingAddressIds !== undefined) {
      const billingAddresses: Address[] = addresses.filter(
        (address: Address): boolean => billingAddressIds.find((id: string): boolean => id === address.id) !== undefined
      );
      billingAddresses.forEach((address: Address, index: number): void => {
        const curAddress: HTMLDivElement = this.createAddressBlock(
          address,
          address.id === defaultBillingAddressId,
          index,
          'billing'
        );
        wrapper.append(curAddress);
      });
    }

    return wrapper;
  }
  createShippingAdresses({
    addresses,
    shippingAddressIds,
    defaultShippingAddressId,
  }: TShippingAddressesInfo): HTMLDivElement {
    const wrapper: HTMLDivElement = document.createElement('div');
    wrapper.classList.add('addresses-wrapper');
    const title: HTMLHeadingElement = document.createElement('h5');
    title.textContent = 'Shipping Address(es)';

    wrapper.append(title);

    if (addresses !== undefined && shippingAddressIds !== undefined) {
      const shippingAddresses: Address[] = addresses.filter(
        (address: Address): boolean => shippingAddressIds.find((id: string): boolean => id === address.id) !== undefined
      );
      shippingAddresses.forEach((address: Address, index: number): void => {
        const curAddress: HTMLDivElement = this.createAddressBlock(
          address,
          address.id === defaultShippingAddressId,
          index,
          'shipping'
        );
        wrapper.append(curAddress);
      });
    }

    return wrapper;
  }

  async createPasswordBlock(res: Customer) {
    const passwordWrapper = document.createElement('div');

    if (res.password !== undefined) {
      const passwordInput: HTMLDivElement = new InputBlock({
        type: 'text',
        id: 'passwordInput',
        label: 'Password',
        placeholder: '',
        name: 'password',
        value: '*****',
        disabled: true,
      }).create;
      passwordWrapper.append(passwordInput);

      const editBtn = document.createElement('button');
      editBtn.textContent = 'Edit Password';
      editBtn.addEventListener('click', (ev) => {
        ev.preventDefault();
        console.log('edit');
      });
    }

    return passwordWrapper;
  }
}
