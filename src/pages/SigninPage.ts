import './SigninPage.scss';
import { SigninForm } from '@components/common/signinForm/SigninForm';

export class SigninPage {
  public createWrapper(): HTMLDivElement {
    const wrapper: HTMLDivElement = document.createElement('div');
    wrapper.classList.add('signin-wrapper');
    wrapper.append(new SigninForm('Sign in', 'Please enter your email and password', 'sign in').createForm());

    return wrapper;
  }
}
