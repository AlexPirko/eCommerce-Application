/* eslint-disable max-lines-per-function */
import { Validate, validate, passwordErrorMsg, errorMsg } from '@lib/utils/validate';
import { textInputs } from '@lib/types/enum';

describe('Validate', () => {
  let validator: Validate;

  beforeEach(() => {
    validator = Validate.getInstance();
  });

  it('should validate email', () => {
    expect(validator.email('test@example.com')).toBeTruthy();
    expect(validator.email('invalid-email')).toBeFalsy();
  });

  it('should validate password', () => {
    expect(validator.password('Valid123!')).toBeTruthy();
    expect(validator.password('short')).toBeFalsy();
    expect(validator.password('noUpperCase')).toBeFalsy();
    expect(validator.password('valid123!')).toBeFalsy();
    expect(validator.password('VALID123!')).toBeFalsy();
  });

  it('should validate post code', () => {
    expect(validator.postCode('123456')).toBeTruthy();
  });
  it('should validate date code', () => {
    expect(validator.date('2025-10-12')).toBeFalsy();
    expect(validator.date('200-10-12')).toBeTruthy();
  });

  it('should validate noSpec', () => {
    expect(validator.noSpec('1234567')).toBeFalsy();
    expect(validator.noSpec('test!')).toBeFalsy();
    expect(validator.noSpec('test')).toBeTruthy();
  });
});

describe('validate', () => {
  let inputMock: HTMLInputElement;

  beforeEach(() => {
    inputMock = document.createElement('input');
  });

  it('should validate email input', () => {
    inputMock.type = 'email';
    expect(validate('test@example.com', inputMock)).toBeTruthy();
    expect(validate('invalid-email', inputMock)).toBeFalsy();
  });

  it('should validate password input', () => {
    inputMock.dataset.type = 'password';
    expect(validate('Valid123!', inputMock)).toBeTruthy();
    expect(validate('short', inputMock)).toBeFalsy();
    expect(validate('noUpperCase', inputMock)).toBeFalsy();
    expect(validate('valid123!', inputMock)).toBeFalsy();
    expect(validate('VALID123!', inputMock)).toBeFalsy();
  });

  it('should validate other input types', () => {
    inputMock.dataset.type = textInputs.FIRST;
    expect(validate('1234567', inputMock)).toBeFalsy();
    expect(validate('test!', inputMock)).toBeFalsy();
    expect(validate('test', inputMock)).toBeTruthy();
    inputMock.dataset.type = textInputs.POST;
    expect(validate('123456', inputMock)).toBeTruthy();

    inputMock.dataset.type = '';
    inputMock.type = 'text';
    expect(validate('', inputMock)).toBeFalsy();

    inputMock.type = 'date';
    expect(validate('2025-10-12', inputMock)).toBeFalsy();
    expect(validate('200-10-12', inputMock)).toBeTruthy();
  });

  it('should handle valid input by removing invalid class', () => {
    inputMock.type = 'email';
    inputMock.classList.add('invalid');
    validate('test@example.com', inputMock);
    expect(inputMock.classList.contains('invalid')).toBeFalsy();
  });

  it('should handle invalid input by adding invalid class', () => {
    inputMock.type = 'email';
    validate('invalid-email', inputMock);
    expect(inputMock.classList.contains('invalid')).toBeTruthy();
  });
});

describe('passwordErrorMsg', () => {
  it('should return error message for short password', () => {
    const errorMsg = passwordErrorMsg('short');
    expect(errorMsg).toBe('Password must be at least 8 characters long');
  });

  it('should return error message for password without uppercase letter', () => {
    const errorMsg = passwordErrorMsg('valid123!');
    expect(errorMsg).toBe('Password must contain at least one uppercase letter(A-Z)');
  });

  it('should return error message for password without lowercase letter', () => {
    const errorMsg = passwordErrorMsg('VALID123!');
    expect(errorMsg).toBe('Password must contain at least one lower letter(a-z)');
  });

  it('should return error message for password without digit', () => {
    const errorMsg = passwordErrorMsg('ValidUpperCase!');
    expect(errorMsg).toBe('Password must contain at least one digit (0-9)');
  });

  it('should return error message for password without special character', () => {
    const errorMsg = passwordErrorMsg('Valid123NoSpecial');
    expect(errorMsg).toBe('Password must contain at least one special character (e.g., !@#$%^&*)');
  });

  it('should return default error message for incorrect password', () => {
    const errorMsg = passwordErrorMsg('InvalidPassword123!');
    expect(errorMsg).toBe('incorrect password');
  });

  it('should return default error message for valid password', () => {
    const errorMsg = passwordErrorMsg('ValidPassword123!');
    expect(errorMsg).toBe('incorrect password');
  });
});

describe('errorMsg', () => {
  it('should return error message for email type', () => {
    const errorMessage = errorMsg('email');
    expect(errorMessage).toBe('Email address must be properly formatted');
  });

  it('should return error message for first name, last name, and city types', () => {
    const errorMessage = errorMsg(textInputs.CITY);
    expect(errorMessage).toBe("There shouldn't be any special characters or numbers");
  });

  it('should return error message for post code type', () => {
    const errorMessage = errorMsg(textInputs.POST);
    expect(errorMessage).toBe('Wrong Post Format');
  });

  it('should return error message for date type', () => {
    const errorMessage = errorMsg('date');
    expect(errorMessage).toBe('You have to be older 13 years');
  });

  it('should return default error message for unknown type', () => {
    const errorMessage = errorMsg('unknownType');
    expect(errorMessage).toBe('Incorrect format');
  });
});
