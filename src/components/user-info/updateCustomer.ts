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

// updateAddress(wrapper: HTMLDivElement, addressId: string) {
// const isDefaultBilling = wrapper.querySelector('[name="defaultBilling"]');
// const isDefaultShipping = wrapper.querySelector('[name="defaultShipping"]');
// const country = wrapper.querySelector(`[name="${addressId}"]`);
// const city = wrapper.querySelector(`[name="city"]`);
// const street = wrapper.querySelector(`[name="streetName"]`);
// const postal = wrapper.querySelector(`[name="postalCode"]`);
// }
