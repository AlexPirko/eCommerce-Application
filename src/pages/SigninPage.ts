import { SigninForm } from '@components/common/signinForm/SigninForm';
import './SigninPage.scss';

export class SigninPage {
  createWrapper() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('signin-wrapper');
    wrapper.append(new SigninForm('signin', 'right now', 'signin').createForm());

    return wrapper;
  }
}
