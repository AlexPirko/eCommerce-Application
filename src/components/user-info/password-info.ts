import { Customer, ClientResponse } from '@commercetools/platform-sdk';
import InputBlock from '@components/common/input/Input-block';
import ApiServices from '@lib/api/api-services';

const api: ApiServices = new ApiServices();

export async function createPasswordBlock(res: Customer) {
  const passwordWrapper: HTMLFormElement = document.createElement('form');
  passwordWrapper.classList.add('password-wrapper');
  const title: HTMLHeadingElement = document.createElement('h5');
  title.textContent = 'Password';
  passwordWrapper.append(title);
  if (res.password !== undefined) {
    const passwordInput: HTMLDivElement = new InputBlock({
      type: 'text',
      id: 'passwordInput',
      label: 'Password',
      placeholder: '',
      name: 'password',
      value: '*****',
      disabled: true,
    }).create;
    passwordWrapper.append(passwordInput);

    const editBtn: HTMLButtonElement = document.createElement('button');
    editBtn.classList.add('btn');
    editBtn.textContent = 'Edit Password';
    editBtn.addEventListener('click', (ev) => {
      ev.preventDefault();
      editPassword(editBtn, passwordInput, passwordWrapper, res);
    });
    passwordWrapper.append(editBtn);
  }
  return passwordWrapper;
}

// eslint-disable-next-line max-lines-per-function
function editPassword(
  editBtn: HTMLButtonElement,
  passwordInput: HTMLDivElement,
  passwordWrapper: HTMLFormElement,
  res: Customer
) {
  editBtn.disabled = true;
  passwordInput.replaceWith(
    new InputBlock({
      type: 'password',
      id: 'passwordInput',
      label: 'Enter your old password',
      placeholder: '',
      name: 'password',
      value: '',
      disabled: false,
    }).create
  );
  const newPassword: HTMLDivElement = new InputBlock({
    type: 'password',
    id: 'newPasswordInput',
    label: 'Enter your new password',
    placeholder: '',
    name: 'password',
    value: '',
    disabled: false,
  }).create;

  const checkNewPassword: HTMLDivElement = new InputBlock({
    type: 'password',
    id: 'checkNewPasswordInput',
    label: 'Enter your new password',
    placeholder: '',
    name: 'password',
    value: '',
    disabled: false,
  }).create;

  const submitBtn: HTMLButtonElement = document.createElement('button');
  submitBtn.classList.add('btn');
  submitBtn.textContent = 'Change Password';
  const cancelBtn: HTMLButtonElement = document.createElement('button');
  cancelBtn.classList.add('btn');
  cancelBtn.textContent = 'Cancel';

  cancelBtn.addEventListener('click', async (ev: MouseEvent) => {
    ev.preventDefault();
    passwordWrapper.replaceWith(await createPasswordBlock(res));
    editBtn.disabled = false;
  });

  submitBtn.addEventListener('click', async (ev) => {
    ev.preventDefault();
    await submitPassword(passwordWrapper, res, editBtn);
  });
  passwordWrapper.append(newPassword, checkNewPassword, submitBtn, cancelBtn);
}

async function submitPassword(passwordWrapper: HTMLFormElement, res: Customer, editBtn: HTMLButtonElement) {
  M.AutoInit();

  const newPasswordInput: Element | null = passwordWrapper.querySelector('#newPasswordInput');
  const checkPassword: Element | null = passwordWrapper.querySelector('#checkNewPasswordInput');
  const currentPasswordInput: Element | null = passwordWrapper.querySelector('#passwordInput');
  const email: Element | null = document.querySelector('#emailInput');

  if (newPasswordInput !== null && checkPassword !== null && currentPasswordInput !== null) {
    const currentPassword: string = (<HTMLInputElement>currentPasswordInput).value;
    const firstValue: string = (<HTMLInputElement>newPasswordInput).value;
    const secondValue: string = (<HTMLInputElement>checkPassword).value;
    if (firstValue !== secondValue) {
      M.toast({ html: 'You have entered different passwords', classes: 'error-toast' });
    } else {
      const customerRes: ClientResponse<Customer> = await api.getCustomer(res.id);
      api
        .changePassword({
          id: customerRes.body.id,
          version: customerRes.body.version,
          currentPassword,
          newPassword: firstValue,
        })
        .then(async (): Promise<void> => {
          M.toast({ html: 'You have changed password!', classes: 'success-toast' });
          passwordWrapper.replaceWith(await createPasswordBlock(res));
          api.customerLogin({ email: (<HTMLInputElement>email)?.value, password: firstValue });
          editBtn.disabled = false;
        })
        .catch((): void => {
          currentPasswordInput.classList.add('invalid');
          M.toast({ html: 'You have entered wrong password', classes: 'error-toast' });
        });
    }
  }
  editBtn.disabled = false;
}
