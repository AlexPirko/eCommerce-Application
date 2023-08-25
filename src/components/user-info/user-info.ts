import './user-info';
import InputBlock from '@components/common/input/Input-block';
import ApiServices from '@lib/api/api-services';

export class UserInfo {
  createInfoBlock() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('info-wrapper');
    const title: HTMLHeadElement = document.createElement('h3');
    title.textContent = 'User Info';
    const btn = document.createElement('button');
    btn.textContent = 'ggg';
    const api = new ApiServices();
    btn.addEventListener('click', async () => {
      const res = await api.getCurrentCustomer();
      console.log(res);
    });
    wrapper.append(title, this.createUserInfoBlock(), btn);
    return wrapper;
  }

  createUserInfoBlock(): DocumentFragment {
    const wrapper: DocumentFragment = new DocumentFragment();
    const nameInput: HTMLDivElement = new InputBlock({
      type: 'text',
      id: 'nameInput',
      label: 'First Name',
      placeholder: '',
      name: 'firstName',
      value: 'oks',
      disabled: true,
    }).create;

    const surnameInput: HTMLDivElement = new InputBlock({
      type: 'text',
      id: 'surnameInput',
      label: 'Second Name',
      placeholder: '',
      name: 'secondName',
      value: 'pozd',
      disabled: true,
    }).create;
    const dateInput: HTMLDivElement = new InputBlock({
      type: 'text',
      id: 'nameInput',
      label: 'First Name',
      placeholder: '',
      name: 'firstName',
      value: '10.07.1994',
      disabled: true,
    }).create;

    wrapper.append(nameInput, surnameInput, dateInput);
    return wrapper;
  }
}
