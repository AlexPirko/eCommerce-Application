import './user-info';
import InputBlock from '@components/common/input/Input-block';
import ApiServices from '@lib/api/api-services';
import { Customer, ClientResponse, Address } from '@commercetools/platform-sdk';
import './user-info.scss';

type TUserInfo = {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
};

type TAddressInfo = {
  country?: string;
  city?: string;
  streetName?: string;
  postalCode?: string;
  id?: string;
};
type TBillingAddressesInfo = {
  addresses?: Address[];
  billingAddressIds?: string[];
  defaultBillingAddressId?: string;
};
type TShippingAddressesInfo = {
  addresses?: Address[];
  shippingAddressIds?: string[];
  defaultShippingAddressId?: string;
};
export class UserInfo {
  services: ApiServices;
  constructor() {
    this.services = new ApiServices();
  }

  async createInfoBlock(): Promise<HTMLDivElement> {
    const wrapper: HTMLDivElement = document.createElement('div');
    try {
      const res: Customer = await this.getInfo();
      console.log(res);
      const infoWrapper = document.createElement('form');
      infoWrapper.classList.add('info-wrapper');
      infoWrapper.append(
        this.createUserInfoBlock(res),
        this.createBillingAdresses(res),
        this.createShippingAdresses(res)
      );
      wrapper.append(infoWrapper, await this.createEditBtn(res));
      return wrapper;
    } catch (er) {
      console.log(er);
      const title: HTMLHeadElement = document.createElement('h5');
      title.textContent = 'Something went wrong, please visit this page later';
      wrapper.append(title);
      return wrapper;
    }
  }

  async createEditBtn({ id, version }: { id: string; version: number }): Promise<HTMLButtonElement> {
    const btn: HTMLButtonElement = document.createElement('button');
    btn.classList.add('waves-effect', 'waves-light', 'btn', 'edit-btn');
    btn.innerHTML = `
    <i class="material-icons left">edit</i> Edit`;
    btn.addEventListener('click', async (ev) => {
      ev.preventDefault();
      if (btn.textContent === 'Save') {
        btn.innerHTML = `
        <i class="material-icons left">edit</i> Edit`;
        await this.saveEdit(id, version);
      } else {
        this.editMode();
        btn.textContent = 'Save';
      }
    });
    return btn;
  }

  editMode() {
    const form = document.querySelector('.info-wrapper');
    if (form !== null) {
      const inputs = form.querySelectorAll('input');
      inputs.forEach((input: HTMLInputElement) => {
        input.removeAttribute('disabled');
      });
    }
  }

  async saveEdit(id: string, version: number) {
    const form = document.querySelector('.info-wrapper');
    if (form !== null) {
      const inputs = form.querySelectorAll('input');
      inputs.forEach((input: HTMLInputElement) => {
        input.setAttribute('disabled', 'true');
        input.classList.remove('valid');
      });
      console.log(id);
      // const formData = new FormData(<HTMLFormElement>form);
      const noErrors = Array.from(inputs).every((input: HTMLInputElement) => !input.classList.contains('invalid'));
      if (noErrors) {
        try {
          await this.services.updateCustomer(id, {
            version,
            actions: [
              {
                action: 'changeEmail',
                email: 'email@example.com',
              },
            ],
          });
        } catch (er) {
          console.log(er);
        }
      }
    }
  }

  async getInfo(): Promise<Customer> {
    // const api: ApiServices = new ApiServices();
    const res: ClientResponse<Customer> = await this.services.getCurrentCustomer();
    return res.body;
  }

  // eslint-disable-next-line max-lines-per-function
  createUserInfoBlock({ email, password, firstName, lastName, dateOfBirth }: TUserInfo): HTMLDivElement {
    const wrapper: HTMLDivElement = document.createElement('div');
    wrapper.classList.add('user-info');
    const title: HTMLHeadElement = document.createElement('h5');
    title.textContent = 'User Info';
    wrapper.append(title);

    if (email !== undefined) {
      console.log(email);
      // const emailInput: HTMLDivElement = new InputBlock({
      //   type: 'email',
      //   id: 'emailInput',
      //   label: 'Email',
      //   placeholder: '',
      //   name: 'email',
      //   value: email,
      //   disabled: true,
      // }).create;
      // wrapper.append(emailInput);
    }

    if (password !== undefined) {
      console.log(password);
      // const passwordInput: HTMLDivElement = new InputBlock({
      //   type: 'text',
      //   id: 'passwordInput',
      //   label: 'Password',
      //   placeholder: '',
      //   name: 'password',
      //   value: '*****',
      //   disabled: true,
      // }).create;
      // wrapper.append(passwordInput);
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
      wrapper.append(nameInput);
    }
    if (lastName !== undefined) {
      const surnameInput: HTMLDivElement = new InputBlock({
        type: 'text',
        id: 'surnameInput',
        label: 'Second Name',
        placeholder: '',
        name: 'secondName',
        value: lastName,
        disabled: true,
      }).create;
      wrapper.append(surnameInput);
    }
    if (dateOfBirth !== undefined) {
      const dateInput: HTMLDivElement = new InputBlock({
        type: 'date',
        id: 'dateOfBirth',
        label: 'Date of Birth',
        placeholder: '',
        name: 'firstName',
        value: dateOfBirth,
        disabled: true,
      }).create;
      wrapper.append(dateInput);
    }
    return wrapper;
  }

  // eslint-disable-next-line max-lines-per-function
  createAddressBlock(
    { country, city, streetName, postalCode, id }: TAddressInfo,
    isDefault: boolean,
    index: number,
    type: 'billing' | 'shipping'
  ) {
    const wrapper: HTMLDivElement = document.createElement('div');
    wrapper.classList.add('address-wrapper');
    if (isDefault) {
      wrapper.style.backgroundColor = 'aquamarine';
    }

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
    const defaultRadio = `
    <p>
      <label>
        <input name=${type === 'billing' ? 'defaultBilling' : 'defaultShipping'} type="radio" disabled ${
          isDefault ? 'checked' : ''
        }/>
        <span>${
          type === 'billing'
            ? isDefault
              ? 'Default Billing Address'
              : 'Set as Default Billing Address'
            : isDefault
            ? 'Default Shipping Address'
            : 'Set as Default Shipping Address'
        }</span>
      </label>
    </p>`;
    wrapper.insertAdjacentHTML('beforeend', defaultRadio);
    return wrapper;
  }

  createBillingAdresses({ addresses, billingAddressIds, defaultBillingAddressId }: TBillingAddressesInfo) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('addresses-wrapper');
    const title = document.createElement('h5');
    title.textContent = 'Billing Address(es)';

    wrapper.append(title);

    if (addresses !== undefined && billingAddressIds !== undefined) {
      const billingAddresses = addresses.filter(
        (address) => billingAddressIds.find((id: string) => id === address.id) !== undefined
      );
      billingAddresses.forEach((address: Address, index: number) => {
        const curAddress = this.createAddressBlock(address, address.id === defaultBillingAddressId, index, 'billing');
        wrapper.append(curAddress);
      });
    }

    return wrapper;
  }
  createShippingAdresses({ addresses, shippingAddressIds, defaultShippingAddressId }: TShippingAddressesInfo) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('addresses-wrapper');
    const title = document.createElement('h5');
    title.textContent = 'Shipping Address(es)';

    wrapper.append(title);

    if (addresses !== undefined && shippingAddressIds !== undefined) {
      const shippingAddresses = addresses.filter(
        (address) => shippingAddressIds.find((id: string) => id === address.id) !== undefined
      );
      shippingAddresses.forEach((address: Address, index: number) => {
        const curAddress = this.createAddressBlock(address, address.id === defaultShippingAddressId, index, 'shipping');
        wrapper.append(curAddress);
      });
    }

    return wrapper;
  }
}
