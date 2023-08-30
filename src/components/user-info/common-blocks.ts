import { updateCustomerRequest } from './updateCustomer';

export function createEditBtn({ text }: { text: string }): HTMLButtonElement {
  const btn: HTMLButtonElement = document.createElement('button');
  btn.classList.add('waves-effect', 'waves-light', 'btn', 'edit-btn');
  btn.innerHTML = `
    <i class="material-icons left">edit</i> Edit ${text}`;
  return btn;
}

export async function saveEdit(
  form: HTMLFormElement,
  btn: HTMLButtonElement,
  id: string,
  version: number,
  text: string
): Promise<void> {
  M.AutoInit();
  const formData: FormData = new FormData(form);
  const inputs: NodeListOf<HTMLInputElement> = form.querySelectorAll('input');
  const btns: NodeListOf<HTMLButtonElement> = form.querySelectorAll('button');
  const noErrors: boolean = Array.from(inputs).every((input: HTMLInputElement) => !input.classList.contains('invalid'));
  if (noErrors) {
    btn.innerHTML = `
      <i class="material-icons left">edit</i> Edit ${text}`;
    inputs.forEach((input: HTMLInputElement): void => {
      input.setAttribute('disabled', 'true');
      input.classList.remove('valid');
    });
    btns.forEach((button: HTMLButtonElement, index: number): void => {
      if (index !== btns.length - 1) button.disabled = true;
    });

    updateCustomerRequest(formData, id, version);
  }
}

export function editMode(form: HTMLFormElement) {
  const inputs: NodeListOf<HTMLInputElement> = form.querySelectorAll('input');
  inputs.forEach((input: HTMLInputElement): void => {
    input.removeAttribute('disabled');
  });
  const btns: NodeListOf<HTMLButtonElement> = form.querySelectorAll('button');
  btns.forEach((button: HTMLButtonElement) => (button.disabled = false));
}
