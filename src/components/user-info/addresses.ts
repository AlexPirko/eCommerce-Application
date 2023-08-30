import { TAddressInfo, TBillingAddressesInfo, TShippingAddressesInfo } from '@lib/types/user-info-types';
import InputBlock from '@components/common/input/Input-block';
import { editMode, saveEdit } from './common-blocks';
import { Address } from '@commercetools/platform-sdk';

// eslint-disable-next-line max-lines-per-function
export function createAddressBlock(
  { country, city, streetName, postalCode, id }: TAddressInfo,
  version: number,
  isDefault: boolean,
  index: number,
  type: 'billing' | 'shipping',
  isNew = false
): HTMLFormElement {
  const addressForm: HTMLFormElement = document.createElement('form');
  addressForm.classList.add('address-form');
  if (id !== undefined) addressForm.setAttribute('id', id);
  const btns = adressesBtns(isNew, addressForm, id ?? 'id', version);

  addressForm.append(btns);

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
    addressForm.insertAdjacentHTML('afterbegin', countries);
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
    addressForm.append(cityInput);
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
    addressForm.append(streetInput);
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
    addressForm.append(postalCodeInput);
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
  addressForm.insertAdjacentHTML('afterbegin', defaultRadio);
  if (isDefault) {
    addressForm.style.backgroundColor = 'aquamarine';
    const addBtn: HTMLButtonElement = document.createElement('button');
    addBtn.textContent = `Add new ${type} Address`;
    addBtn.classList.add('waves-effect', 'waves-light', 'btn');
    addBtn.disabled = false;
    addBtn.addEventListener('click', (ev: MouseEvent) => {
      ev.preventDefault();
      addNewAddress(type, addBtn, version);
    });
    addressForm.append(addBtn);
  }

  return addressForm;
}

export function addNewAddress(type: 'billing' | 'shipping', btn: HTMLButtonElement, version: number) {
  const newAddress = createAddressBlock(
    { country: '', city: '', streetName: '', postalCode: '' },
    version,
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

export function adressesBtns(isNew: boolean, addressForm: HTMLFormElement, id: string, version: number) {
  const btnsWrapper = document.createElement('div');
  btnsWrapper.classList.add('btns-wrapper');

  const deleteBtn = document.createElement('button');
  deleteBtn.disabled = true;
  if (isNew) {
    deleteBtn.textContent = 'Cancel';
    deleteBtn.addEventListener('click', (ev) => {
      ev.preventDefault();
      addressForm.remove();
    });
  } else {
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', (ev) => {
      ev.preventDefault();
    });
    editBtn.addEventListener('click', (ev) => {
      ev.preventDefault();
      if (editBtn.textContent === 'Edit') {
        editBtn.textContent = 'Save';
        editMode(addressForm);
      } else {
        editBtn.textContent = 'Edit';
        saveEdit(addressForm, editBtn, id, version, '');
      }
      btnsWrapper.append(editBtn);
    });
  }
  btnsWrapper.append(deleteBtn);
  return btnsWrapper;
}
export function createBillingAdresses({
  addresses,
  billingAddressIds,
  defaultBillingAddressId,
  version,
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
      const curAddress: HTMLFormElement = createAddressBlock(
        address,
        version,
        address.id === defaultBillingAddressId,
        index,
        'billing'
      );
      wrapper.append(curAddress);
    });
  }

  return wrapper;
}
export function createShippingAdresses({
  addresses,
  shippingAddressIds,
  defaultShippingAddressId,
  version,
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
      const curAddress: HTMLFormElement = createAddressBlock(
        address,
        version,
        address.id === defaultShippingAddressId,
        index,
        'shipping'
      );
      wrapper.append(curAddress);
    });
  }

  return wrapper;
}
// const submitText: string = 'addresses information';
// const submitBtn: HTMLButtonElement = await this.createEditBtn({ text: submitText });
// adressesForm.append(submitBtn);
// adressesForm.addEventListener('submit', async (ev: SubmitEvent): Promise<void> => {
//   ev.preventDefault();
//   if (submitBtn.textContent === `Save ${submitText}`) {
//     await this.saveEdit(adressesForm, submitBtn, res.id, res.version, `${submitText}`);
//   } else {
//     this.editMode(adressesForm);
//     submitBtn.textContent = `Save ${submitText}`;
//   }
// });
