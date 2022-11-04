import {validateFormElement} from './index';
import { BlockRefs } from 'core';

export function isValidFormData(e: Event, refs: BlockRefs) {
  e.preventDefault();
  let isValid = true;

  Object.entries(refs).forEach(([name, field]) => {
    const element = field.element?.querySelector(`#${name}`) as HTMLInputElement;
    const errorMessage = validateFormElement(element);
    refs[element.id].refs.errorRef.setProps({text: errorMessage});
    if (errorMessage) {
      isValid = false;
    }
  });
  return isValid;
}
export function getFormData(element: Nullable<HTMLElement>, returnFormData = false) {
  let formObj: Indexed = {};
  const form = element?.querySelector('form') as HTMLFormElement;

  const formData = new FormData(form);
  if (returnFormData) {
    return formData;
  }
  for (const [key, value] of formData.entries()) {
    formObj = {...formObj,  [key]: value};
  }
  return formObj;
}
