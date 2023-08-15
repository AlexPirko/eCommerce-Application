import './SigninPage.scss';
import { LoginForm } from '@components/common/signinForm/LoginForm';

export class LoginPage {
  public createWrapper(): HTMLDivElement {
    const wrapper: HTMLDivElement = document.createElement('div');
    wrapper.classList.add('signin-wrapper');
    wrapper.append(
      new LoginForm({
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

// new LoginPage().createWrapper()
