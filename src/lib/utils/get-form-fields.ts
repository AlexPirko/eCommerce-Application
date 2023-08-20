export function getFormFieldsAsCustomerDraft() {
  const forms = document.forms;
  const form: HTMLFormElement = Array.from(forms)[0];
  const formData = new FormData(form);
  console.log(form);
  console.log(Array.from(formData));
}
