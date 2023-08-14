import './SigninPage.scss';
import { SigninForm } from '@components/common/signinForm/SigninForm';

export class SigninPage {
  public createWrapper(): HTMLDivElement {
    const wrapper: HTMLDivElement = document.createElement('div');
    wrapper.classList.add('signin-wrapper');
    wrapper.append(
      new SigninForm({
        titleText: 'Sign in',
        descText: 'Please enter your email and password',
        btnText: 'sign in',
        linkText: "Don't have an account ? Register ",
        onSubmit: () => console.log('submit'),
      }).createForm()
    );

    return wrapper;
  }
}

// new SigninPage().createWrapper()
