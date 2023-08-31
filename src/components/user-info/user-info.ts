/* eslint-disable max-lines-per-function */
import './user-info';
import ApiServices from '@lib/api/api-services';
import 'materialize-css/dist/css/materialize.min.css';
import { Customer, ClientResponse } from '@commercetools/platform-sdk';
import './user-info.scss';
import createPersonalInfoBlock from './personal-info';
import { createPasswordBlock } from './password-block';
import { createShippingAdresses, createBillingAdresses } from './addresses';

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
    wrapper.classList.add('user-info-wrapper');
    try {
      const res: Customer = await this.getInfo();
      console.log(res);
      wrapper.append(
        await createPasswordBlock(res),
        await createPersonalInfoBlock(res),
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

  async createAdressesBlock(res: Customer): Promise<HTMLDivElement> {
    const adressesBlock: HTMLDivElement = document.createElement('div');
    const title: HTMLHeadElement = document.createElement('h5');
    title.textContent = 'Addresses Information';
    const adressesWrapper: HTMLDivElement = document.createElement('div');
    adressesWrapper.classList.add('addresses');
    adressesWrapper.append(createBillingAdresses(res), createShippingAdresses(res));
    adressesBlock.append(title, adressesWrapper);
    return adressesBlock;
  }
}
