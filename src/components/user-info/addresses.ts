import { TAddressInfo, TBillingAddressesInfo, TShippingAddressesInfo } from '@lib/types/user-info-types';
import InputBlock from '@components/common/input/Input-block';
import { saveEdit, editMode } from './common-blocks';
import { Address } from '@commercetools/platform-sdk';
import { validate } from '@lib/utils/validate';
import { deleteAddress } from './updateCustomer';
import { uniqueID } from '@lib/utils/randomNumber';

// eslint-disable-next-line max-lines-per-function
async function createAddressBlock(
  { country, city, streetName, postalCode, id }: TAddressInfo,
  isDefault: boolean,
  type: 'billing' | 'shipping',
  customerId: string,
  isNew = false
): Promise<HTMLFormElement> {
  const addressForm: HTMLFormElement = document.createElement('form');
  addressForm.classList.add('address-form');
  if (id !== undefined) addressForm.setAttribute('id', id);
  const btns: HTMLDivElement = await adressesBtns(isNew, addressForm, customerId, type, id);
  addressForm.append(btns);

  if (country !== undefined) {
    const countries: HTMLDivElement = countriesBlock(type, addressForm);
    addressForm.append(countries);
  }
  if (city !== undefined) {
    const cityInput: HTMLDivElement = new InputBlock({
      type: 'text',
      id: uniqueID(),
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
      id: uniqueID(),
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
      id: uniqueID(),
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

  input1.addEventListener('change', (): void => onChange(input1));
  input2.addEventListener('change', (): void => onChange(input2));

  span1.textContent = 'Russia';
  span2.textContent = 'USA';

  label1.append(input1, span1);
  label2.append(input2, span2);

  wrapper.append(label1, label2);
  return wrapper;
}

async function addNewAddress(type: 'billing' | 'shipping', btn: HTMLButtonElement, id: string): Promise<void> {
  const newAddress: HTMLFormElement = await createAddressBlock(
    { country: '', city: '', streetName: '', postalCode: '' },
    false,
    type,
    id,
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

// eslint-disable-next-line max-lines-per-function
async function adressesBtns(
  isNew: boolean,
  addressForm: HTMLFormElement,
  customerId: string,
  type: 'billing' | 'shipping',
  id?: string
) {
  const btnsWrapper: HTMLDivElement = document.createElement('div');
  btnsWrapper.classList.add('btns-wrapper');
  const editBtn: HTMLButtonElement = document.createElement('button');
  const deleteBtn: HTMLButtonElement = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.classList.add('edit-address-btn');
  editBtn.setAttribute('data-type', type);
  deleteBtn.textContent = 'Delete';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.addEventListener('click', async (ev: MouseEvent): Promise<void> => {
    ev.preventDefault();
    if (id !== undefined) {
      await deleteAddress(customerId, id, type, addressForm);
    }
  });

  const cancelBtn: HTMLButtonElement = document.createElement('button');
  if (isNew) {
    editBtn.textContent = 'Save';
    cancelBtn.disabled = true;
    cancelBtn.textContent = 'Cancel';
    cancelBtn.classList.add('cancel-address-btn');
    deleteBtn.classList.add('none');
    cancelBtn.addEventListener('click', (ev: MouseEvent): void => {
      ev.preventDefault();
      addressForm.remove();
    });
    btnsWrapper.append(cancelBtn);
  }

  editBtn.addEventListener('click', async (ev: MouseEvent): Promise<void> => {
    ev.preventDefault();
    if (editBtn.textContent === 'Edit') {
      editMode(addressForm);
      editBtn.textContent = 'Save';
      editBtn.dataset.action = 'update';
      editBtn.dataset.addressId = id;
    } else {
      isNew
        ? await saveEdit(addressForm, editBtn, customerId, '', cancelBtn)
        : await saveEdit(addressForm, editBtn, customerId, '');
      editBtn.textContent = 'Edit';
      editBtn.disabled = false;
      deleteBtn.classList.remove('none');
      cancelBtn.classList.add('none');
    }
  });

  btnsWrapper.append(editBtn, deleteBtn);
  return btnsWrapper;
}

function setDefaultAddress(type: string, addressForm: HTMLFormElement): void {
  const defaultName: string = `default${type[0].toUpperCase() + type.slice(1)}`;
  const radioDefault: Element | null = addressForm.querySelector(`[name='${defaultName}']`);
  radioDefault?.addEventListener('click', (): void => {
    const allDefaults: NodeListOf<Element> = document.querySelectorAll(`[name='${defaultName}']`);
    allDefaults.forEach((radio): void => {
      (<HTMLInputElement>radio).checked = false;
      radio.closest('.address-form')?.classList.add('unsetDefault');
    });
    (<HTMLInputElement>radioDefault).checked = true;
    radioDefault.closest('.address-form')?.classList.add('setDefault');
  });
}

function addAddressBtn(type: 'billing' | 'shipping', wrapper: HTMLDivElement, id: string): void {
  const addBtn: HTMLButtonElement = document.createElement('button');
  addBtn.textContent = `Add new ${type} Address`;
  addBtn.classList.add('waves-effect', 'waves-light', 'add-btn', 'btn');
  addBtn.disabled = false;
  addBtn.addEventListener('click', (ev: MouseEvent): void => {
    ev.preventDefault();
    addNewAddress(type, addBtn, id);
  });
  wrapper.append(addBtn);
}

export function createShippingAdresses({
  addresses,
  shippingAddressIds,
  defaultShippingAddressId,
  id,
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
    shippingAddresses.forEach(async (address: Address): Promise<void> => {
      const curAddress: HTMLFormElement = await createAddressBlock(
        address,
        address.id === defaultShippingAddressId,
        'shipping',
        id
      );
      wrapper.append(curAddress);
    });
    addAddressBtn('shipping', wrapper, id);
  }
  return wrapper;
}

export function createBillingAdresses({
  addresses,
  billingAddressIds,
  defaultBillingAddressId,
  id,
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
    billingAddresses.forEach(async (address: Address): Promise<void> => {
      const curAddress: HTMLFormElement = await createAddressBlock(
        address,
        address.id === defaultBillingAddressId,
        'billing',
        id
      );
      wrapper.append(curAddress);
    });
    addAddressBtn('billing', wrapper, id);
  }

  return wrapper;
}
