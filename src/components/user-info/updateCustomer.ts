/* eslint-disable max-lines-per-function */
import ApiServices from '@lib/api/api-services';

const api = new ApiServices();

export function updateCustomerRequest(formData: FormData, id: string, version: number) {
  api
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
    .catch((er: Error): void => {
      console.log(er);
      M.toast({ html: er.message, classes: 'rounded' });
    });
}

export function addNewAddress(
  formData: FormData,
  id: string,
  version: number,
  cancelBtn: HTMLButtonElement,
  type: 'billing' | 'shipping'
) {
  const country = String(formData.get(`${type}-country`));
  const postal = String(formData.get(`${type}-postal-form`));
  api
    .updateCustomer(id, {
      version,
      actions: [
        {
          action: 'addAddress',
          address: {
            streetName: String(formData.get('streetName')),
            postalCode: postal,
            city: String(formData.get('city')),
            country,
          },
        },
      ],
    })
    .then((res): void => {
      console.log(res);
      const typeUp = type === 'billing' ? 'Billing' : 'Shipping';
      let isDefault = false;
      if (cancelBtn) {
        const defaultName = `default${typeUp}`;
        const defaultAd = cancelBtn.closest('form')?.querySelector(`[name="${defaultName}"]`);
        if (defaultAd !== null && defaultAd !== null) isDefault = true;
        console.log((<HTMLInputElement>defaultAd)?.checked);
        cancelBtn.remove();
      }
      const addresses = res.addresses;
      const newAdId = addresses[addresses.length - 1].id;

      console.log([...formData]);
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
        .then(() => {
          M.toast({ html: 'Successfully changed info', classes: 'rounded' });
        });
    })
    .catch((er: Error): void => {
      console.log(er);
      M.toast({ html: er.message, classes: 'rounded' });
    });
}

// updateAddress(wrapper: HTMLDivElement, addressId: string) {
// const isDefaultBilling = wrapper.querySelector('[name="defaultBilling"]');
// const isDefaultShipping = wrapper.querySelector('[name="defaultShipping"]');
// const country = wrapper.querySelector(`[name="${addressId}"]`);
// const city = wrapper.querySelector(`[name="city"]`);
// const street = wrapper.querySelector(`[name="streetName"]`);
// const postal = wrapper.querySelector(`[name="postalCode"]`);
// }
