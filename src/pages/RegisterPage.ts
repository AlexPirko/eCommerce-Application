import { RegisterForm } from '@components/common/registerForm/RegisterForm';
import './LoginPage.scss';

export class RegisterPage {
  public createWrapper(): HTMLDivElement {
    const wrapper: HTMLDivElement = document.createElement('div');
    wrapper.classList.add('signin-wrapper');
    wrapper.append(
      new RegisterForm({
        titleText: 'Register',
        descText: 'Please fill the fields',
        btnText: 'Register',
        linkText: 'Already have an account ? Login ',
        onSubmit: () => console.log('submit'),
      }).createForm()
    );

    return wrapper;
  }
}

// new RegisterPage().createWrapper()
