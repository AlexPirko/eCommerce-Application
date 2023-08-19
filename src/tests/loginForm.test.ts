import { LoginForm } from '@components/login-form/login-form';

const formConfig = {
  titleText: 'Test Title',
  descText: 'Test Description',
  btnText: 'Submit',
  linkText: 'Register',
  redirectText: 'register',
  onSubmit: () => console.log('test'),
};

describe('LoginForm class', () => {
  it('should create a form', () => {
    const loginForm = new LoginForm(formConfig);
    const form = loginForm.createForm();

    expect(form).not.toBeNull();
  });
});
