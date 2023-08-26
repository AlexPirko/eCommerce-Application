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
  async createInfoBlock(): Promise<HTMLDivElement> {
    const wrapper: HTMLDivElement = document.createElement('div');
    wrapper.classList.add('info-wrapper');
    try {
      const res: Customer = await this.getInfo();
      console.log(res);
      wrapper.append(this.createUserInfoBlock(res), this.createBillingAdresses(res), this.createShippingAdresses(res));
      return wrapper;
    } catch {
      const title: HTMLHeadElement = document.createElement('h5');
      title.textContent = 'Something went wrong, please visit this page later';
      wrapper.append(title);
      return wrapper;
    }
  }

  async getInfo(): Promise<Customer> {
    const api: ApiServices = new ApiServices();
    const res: ClientResponse<Customer> = await api.getCurrentCustomer();
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
      const emailInput: HTMLDivElement = new InputBlock({
        type: 'email',
        id: 'emailInput',
        label: 'Email',
        placeholder: '',
        name: 'email',
        value: email,
        disabled: true,
      }).create;
      wrapper.append(emailInput);
    }

    if (password !== undefined) {
      const passwordInput: HTMLDivElement = new InputBlock({
        type: 'text',
        id: 'passwordInput',
        label: 'Password',
        placeholder: '',
        name: 'password',
        value: '*****',
        disabled: true,
      }).create;
      wrapper.append(passwordInput);
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
      const date = new Date(dateOfBirth);
      const dateInput: HTMLDivElement = new InputBlock({
        type: 'text',
        id: 'dateOfBirth',
        label: 'Date of Birth',
        placeholder: '',
        name: 'firstName',
        value: date.toLocaleDateString('ru-RU'),
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
      wrapper.style.backgroundColor = 'orange';
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
    console.log(addresses);
    console.log(billingAddressIds);
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
    console.log(addresses);
    console.log(shippingAddressIds);
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
