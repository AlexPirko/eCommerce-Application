import './user-info';
import InputBlock from '@components/common/input/Input-block';
import ApiServices from '@lib/api/api-services';
import { Customer, ClientResponse } from '@commercetools/platform-sdk';
import './user-info.scss';

type TUserInfo = {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
};
export class UserInfo {
  async createInfoBlock(): Promise<HTMLDivElement> {
    const wrapper: HTMLDivElement = document.createElement('div');
    wrapper.classList.add('info-wrapper');
    const title: HTMLHeadElement = document.createElement('h5');
    try {
      title.textContent = 'User Info';
      const res: Customer = await this.getInfo();
      console.log(res);
      wrapper.append(title, this.createUserInfoBlock(res));
      return wrapper;
    } catch {
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

  // createAddressBlock() {

  // }
}
