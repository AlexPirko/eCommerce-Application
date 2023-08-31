/* eslint-disable max-lines-per-function */
import { TAddressInfo, TBillingAddressesInfo, TShippingAddressesInfo } from '@lib/types/user-info-types';
import InputBlock from '@components/common/input/Input-block';
import { saveEdit } from './common-blocks';
import { Address } from '@commercetools/platform-sdk';
import { validate } from '@lib/utils/validate';

// 1) Добавить адрес с помощью addAddress.
// 2) Получаем id добавленного адреса.
// 3) Устанавливаем адреса как shipping/billing с помощью addShippingAddressId

// eslint-disable-next-line max-lines-per-function
export function createAddressBlock(
  { country, city, streetName, postalCode, id }: TAddressInfo,
  version: number,
  isDefault: boolean,
  type: 'billing' | 'shipping',
  isNew = false
): HTMLFormElement {
  const addressForm: HTMLFormElement = document.createElement('form');
  addressForm.classList.add('address-form');
  if (id !== undefined) addressForm.setAttribute('id', id);
  const btns = adressesBtns(isNew, addressForm, version, id ?? 'id');
  addressForm.append(btns);

  if (country !== undefined) {
    const countries = countriesBlock(type, addressForm);
    addressForm.append(countries);
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
      name: `${type}-postal-form`,
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
  setDefaultAddress(type, addressForm);
  if (isDefault) {
    addressForm.classList.add('defaultAddress');
  }

  return addressForm;
}

export function addNewAddress(type: 'billing' | 'shipping', btn: HTMLButtonElement, version: number): void {
  const newAddress: HTMLFormElement = createAddressBlock(
    { country: '', city: '', streetName: '', postalCode: '' },
    version,
    false,
    type,
    true
  );
  btn.parentElement?.insertAdjacentElement('beforeend', newAddress);
  const inputs: NodeListOf<HTMLInputElement> = newAddress.querySelectorAll('input');
  inputs.forEach((input: HTMLInputElement): void => {
    input.removeAttribute('disabled');
  });
  const btns: NodeListOf<HTMLButtonElement> = newAddress.querySelectorAll('button');
  btns.forEach((button: HTMLButtonElement): void => {
    button.removeAttribute('disabled');
  });
}

export function adressesBtns(isNew: boolean, addressForm: HTMLFormElement, version: number, id?: string) {
  const btnsWrapper: HTMLDivElement = document.createElement('div');
  btnsWrapper.classList.add('btns-wrapper');

  if (isNew) {
    const cancelBtn: HTMLButtonElement = document.createElement('button');
    cancelBtn.disabled = true;
    cancelBtn.textContent = 'Cancel';
    cancelBtn.addEventListener('click', (ev): void => {
      ev.preventDefault();
      addressForm.remove();
    });
    const saveBtn: HTMLButtonElement = document.createElement('button');
    saveBtn.textContent = 'Save';
    addressForm.append(cancelBtn, saveBtn);
    saveBtn.addEventListener('click', async (ev): Promise<void> => {
      ev.preventDefault();
      await saveEdit(addressForm, saveBtn, id ?? '1', version, '');
      // saveBtn.textContent = 'Edit';
      // saveBtn.disabled = true;

      // saveBtn.replace(createEditBtn(''));
    });
  }
  // else {
  //   const editBtn = document.createElement('button');
  //   editBtn.textContent = 'Edit';
  //   deleteBtn.textContent = 'Delete';
  //   deleteBtn.addEventListener('click', (ev) => {
  //     ev.preventDefault();
  //   });
  //   editBtn.addEventListener('click', (ev) => {
  //     ev.preventDefault();
  //     if (editBtn.textContent === 'Edit') {
  //       editBtn.textContent = 'Save';
  //       editMode(addressForm);
  //     } else {
  //       saveEdit(addressForm, editBtn, id, version, '');
  //       editBtn.innerHTML = 'Edit';
  //       editBtn.disabled = false;
  //     }
  //     btnsWrapper.append(editBtn);
  //   });
  // btnsWrapper.append(editBtn);
  // }
  // btnsWrapper.append(deleteBtn);
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
    billingAddresses.forEach((address: Address): void => {
      const curAddress: HTMLFormElement = createAddressBlock(
        address,
        version,
        address.id === defaultBillingAddressId,
        'billing'
      );
      addAddressBtn('billing', version, wrapper);
      wrapper.append(curAddress);
    });
  }

  return wrapper;
}

function setDefaultAddress(type: string, addressForm: HTMLFormElement): void {
  const defaultName: string = `default${type[0].toUpperCase() + type.slice(1)}`;
  const radioDefault: Element | null = addressForm.querySelector(`[name='${defaultName}']`);
  radioDefault?.addEventListener('click', () => {
    const allDefaults: NodeListOf<Element> = document.querySelectorAll(`[name='${defaultName}']`);
    allDefaults.forEach((radio) => {
      (<HTMLInputElement>radio).checked = false;
      radio.closest('.address-form')?.classList.remove('defaultAddress');
    });
    (<HTMLInputElement>radioDefault).checked = true;
    radioDefault.closest('.address-form')?.classList.add('defaultAddress');
  });
}

function addAddressBtn(type: 'billing' | 'shipping', version: number, wrapper: HTMLDivElement) {
  const addBtn: HTMLButtonElement = document.createElement('button');
  addBtn.textContent = `Add new ${type} Address`;
  addBtn.classList.add('waves-effect', 'waves-light', 'btn');
  addBtn.disabled = false;
  addBtn.addEventListener('click', (ev: MouseEvent): void => {
    ev.preventDefault();
    addNewAddress(type, addBtn, version);
  });
  wrapper.append(addBtn);
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
    shippingAddresses.forEach((address: Address): void => {
      const curAddress: HTMLFormElement = createAddressBlock(
        address,
        version,
        address.id === defaultShippingAddressId,
        'shipping'
      );
      addAddressBtn('shipping', version, wrapper);

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

function countriesBlock(addressType: string, form: HTMLFormElement): HTMLDivElement {
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
  input1.setAttribute('disabled', 'true');

  input2.setAttribute('name', `${addressType.toLowerCase()}-country`);
  input2.setAttribute('type', 'radio');
  input2.setAttribute('value', 'US');
  input2.setAttribute('disabled', 'true');

  function onChange(input: HTMLInputElement): void {
    const name: 'billing-postal-form' | 'shipping-postal-form' =
      input.name === 'billing-country' ? 'billing-postal-form' : 'shipping-postal-form';
    const postInput: Element | null = form.querySelector(`[name=${name}]`);
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
