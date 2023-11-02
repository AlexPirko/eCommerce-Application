import InputBlock from '@components/common/input/Input-block';
import { TUserInfo } from '@lib/types/user-info-types';
import { saveEdit, editMode, createEditBtn } from './common-blocks';

// eslint-disable-next-line max-lines-per-function
export default async function createPersonalInfoBlock({
  email,
  firstName,
  lastName,
  dateOfBirth,
  id,
}: TUserInfo): Promise<HTMLFormElement> {
  const formUserInfo: HTMLFormElement = document.createElement('form');
  formUserInfo.classList.add('user-info');
  const title: HTMLHeadElement = document.createElement('h5');
  title.textContent = 'Personal Information';
  formUserInfo.append(title);

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
    formUserInfo.append(emailInput);
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
    formUserInfo.append(nameInput);
  }
  if (lastName !== undefined) {
    const surnameInput: HTMLDivElement = new InputBlock({
      type: 'text',
      id: 'lastNameInput',
      label: 'Last Name',
      placeholder: '',
      name: 'lastName',
      value: lastName,
      disabled: true,
    }).create;
    formUserInfo.append(surnameInput);
  }
  if (dateOfBirth !== undefined) {
    const dateInput: HTMLDivElement = new InputBlock({
      type: 'date',
      id: 'dateOfBirth',
      label: 'Date of Birth',
      placeholder: '',
      name: 'dateOfBirth',
      value: dateOfBirth,
      disabled: true,
    }).create;
    formUserInfo.append(dateInput);
  }

  const btnText: string = 'personal info';
  const btn: HTMLButtonElement = createEditBtn({ text: `${btnText}` });
  const cancelBtn: HTMLButtonElement = document.createElement('button');
  cancelBtn.classList.add('waves-effect', 'waves-light', 'btn', 'none', 'cancel-info-btn');
  cancelBtn.textContent = 'Cancel';
  formUserInfo.append(cancelBtn, btn);

  cancelBtn.addEventListener('click', async (ev: MouseEvent): Promise<void> => {
    ev.preventDefault();
    cancelBtn.classList.add('none');
    formUserInfo.replaceWith(
      await createPersonalInfoBlock({
        email,
        firstName,
        lastName,
        dateOfBirth,
        id,
      })
    );
  });

  formUserInfo.addEventListener('submit', async (ev: SubmitEvent): Promise<void> => {
    ev.preventDefault();
    if (btn.textContent === `Save ${btnText}`) {
      await saveEdit(formUserInfo, btn, id, `${btnText}`);
      cancelBtn.classList.add('none');
    } else {
      editMode(formUserInfo);
      btn.textContent = `Save ${btnText}`;
      cancelBtn.classList.remove('none');
    }
  });
  return formUserInfo;
}
