import './user-info';
import ApiServices from '@lib/api/api-services';
import 'materialize-css/dist/css/materialize.min.css';
import { Customer, ClientResponse } from '@commercetools/platform-sdk';
import './user-info.scss';
import createPersonalInfoBlock from './personal-info';
import { createPasswordBlock } from './password-info';
import { createShippingAdresses, createBillingAdresses } from './addresses';

export class UserInfo {
  public services: ApiServices;
  constructor() {
    this.services = new ApiServices();
  }

  private async getInfo(): Promise<Customer> {
    const res: ClientResponse<Customer> = await this.services.getCurrentCustomer();
    return res.body;
  }

  public async createUserInfoPage(): Promise<HTMLDivElement> {
    const wrapper: HTMLDivElement = document.createElement('div');
    wrapper.classList.add('user-info-wrapper');
    try {
      const res: Customer = await this.getInfo();
      wrapper.append(
        await createPasswordBlock(res),
        await createPersonalInfoBlock(res),
        await this.createAdressesBlock(res)
      );
      return wrapper;
    } catch (er) {
      const title: HTMLHeadElement = document.createElement('h5');
      title.textContent = 'Something went wrong, please visit this page later';
      wrapper.append(title);
      return wrapper;
    }
  }

  private async createAdressesBlock(res: Customer): Promise<HTMLDivElement> {
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
