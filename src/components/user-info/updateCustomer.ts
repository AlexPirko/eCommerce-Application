import ApiServices from '@lib/api/api-services';
import { CustomerUpdateAction, ClientResponse, Customer, Address } from '@commercetools/platform-sdk';
import { TAddressCapitalize, TAddress } from '@lib/types/user-info-types';

const api = new ApiServices();

export async function updateCustomerInfo(formData: FormData, id: string): Promise<void> {
  const customerRes: ClientResponse<Customer> = await api.getCustomer(id);
  api
    .updateCustomer(id, {
      version: customerRes.body.version,
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
      M.toast({ html: 'Successfully changed info', classes: 'success-toast' });
    })
    .catch((er: Error): void => {
      console.log(er);
      M.toast({ html: er.message, classes: 'error-toast' });
    });
}

// eslint-disable-next-line max-lines-per-function
export async function addNewAddress(
  formData: FormData,
  id: string,
  cancelBtn: HTMLButtonElement,
  type: TAddress
): Promise<void> {
  const customerRes: ClientResponse<Customer> = await api.getCustomer(id);
  api
    .updateCustomer(id, {
      version: customerRes.body.version,
      actions: [
        {
          action: 'addAddress',
          address: {
            streetName: String(formData.get('streetName')),
            postalCode: String(formData.get(`${type}-postal-form`)),
            city: String(formData.get('city')),
            country: String(formData.get(`${type}-country`)),
          },
        },
      ],
    })
    .then((res): void => {
      const typeUp: TAddressCapitalize = type === 'billing' ? 'Billing' : 'Shipping';
      let isDefault: boolean = false;
      if (cancelBtn) {
        const defaultName: string = `default${typeUp}`;
        const defaultAd: Element | null | undefined = cancelBtn
          .closest('form')
          ?.querySelector(`[name="${defaultName}"]`);
        if (defaultAd !== null && defaultAd !== null) isDefault = (<HTMLInputElement>defaultAd).checked;
        cancelBtn.remove();
      }
      const addresses: Address[] = res.addresses;
      const newAdId: string | undefined = addresses[addresses.length - 1].id;
      api
        .updateCustomer(id, {
          version: res.version,
          actions: [
            {
              action: isDefault ? `setDefault${typeUp}Address` : `add${typeUp}AddressId`,
              addressId: newAdId,
            },
          ],
        })
        .then((): void => {
          M.toast({ html: 'Successfully changed info', classes: 'success-toast' });
        });
    })
    .catch((er: Error): void => {
      M.toast({ html: er.message, classes: 'error-toast' });
    });
}

// eslint-disable-next-line max-lines-per-function
export async function updateAddress(
  formData: FormData,
  id: string,
  addressId: string,
  type: TAddress,
  btn: HTMLButtonElement
): Promise<void> {
  const country: string = String(formData.get(`${type}-country`));
  const postal: string = String(formData.get(`${type}-postal-form`));
  const typeUp: TAddressCapitalize = type === 'billing' ? 'Billing' : 'Shipping';
  const defaultName: 'setDefaultBillingAddress' | 'setDefaultShippingAddress' = `setDefault${typeUp}Address`;
  let isDefault: boolean = false;
  const defaultId: CustomerUpdateAction = {
    action: defaultName,
    addressId: addressId,
  };

  const actonsAr: CustomerUpdateAction[] = [
    {
      action: 'changeAddress',
      addressId: addressId,
      address: {
        streetName: String(formData.get('streetName')),
        postalCode: postal,
        city: String(formData.get('city')),
        country,
      },
    },
  ];

  const defaultAd: Element | null | undefined = btn.closest('form')?.querySelector(`[name="default${typeUp}"]`);
  if (defaultAd !== null && defaultAd !== null) isDefault = (<HTMLInputElement>defaultAd).checked;
  if (isDefault) actonsAr.push(defaultId);

  const customerRes: ClientResponse<Customer> = await api.getCustomer(id);
  api
    .updateCustomer(id, {
      version: customerRes.body.version,
      actions: actonsAr,
    })
    .then((): void => {
      M.toast({ html: 'Successfully changed address', classes: 'success-toast' });
    })
    .catch((er: Error): void => {
      M.toast({ html: er.message, classes: 'error-toast' });
    });
}

export async function deleteAddress(
  id: string,
  addressId: string,
  type: TAddress,
  addressForm: HTMLFormElement
): Promise<void> {
  const typeUp: TAddressCapitalize = type === 'billing' ? 'Billing' : 'Shipping';
  const customerRes: ClientResponse<Customer> = await api.getCustomer(id);

  api
    .updateCustomer(id, {
      version: customerRes.body.version,
      actions: [
        {
          action: `remove${typeUp}AddressId`,
          addressId: addressId,
        },
        {
          action: 'removeAddress',
          addressId: addressId,
        },
      ],
    })
    .then((): void => {
      M.toast({ html: 'Successfully delete address', classes: 'success-toast' });
      addressForm.remove();
    })
    .catch((): void => {
      M.toast({ html: 'Something went wrong. Try later', classes: 'error-toast' });
    });
}
