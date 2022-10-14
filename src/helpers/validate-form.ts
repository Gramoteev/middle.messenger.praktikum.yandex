export enum ValidateName {
  Login = 'login',
  Email = 'email',
  Password = 'password',
  OldPassword = 'oldPassword',
  NewPassword = 'newPassword',
  RepeatNewPassword = 'repeatNewPassword',
  First_name = 'first_name',
  Second_name = 'second_name',
  Phone = 'phone',
}

export default function validateFormElement(element: HTMLInputElement): string {
  const name: string = element.name;
  const value: string = element.value;
  let errorMessage = '';

  if(name === ValidateName.Email) {
    if (!/^[\w+-]+(\.[\w+-]+)*@[\w-]+(\.[\w-]+)+$/.test(value)) {
      errorMessage = 'Use correct email';
    }
  }
  if(name === ValidateName.Login) {
    if (!/^.{3,20}$/.test(value)) {
      errorMessage = 'Should contains from 3 to 20 letters';
    } else if (!/^[a-zA-Z0-9\-_]+$/i.test(value)) {
      errorMessage = "Don't use non-Latin letters and special characters";
    }
  }
  if(
    name === ValidateName.Password ||
    name === ValidateName.NewPassword ||
    name === ValidateName.OldPassword ||
    name === ValidateName.RepeatNewPassword
  ) {
    if (!/^.{8,40}$/.test(value)) {
      errorMessage = 'Should contains from 8 to 40 characters';
    } else if (!/[A-Z,А-Я]/.test(value)) {
      errorMessage = 'Use at least one capital letter';
    } else if (!/[0-9]/.test(value)) {
      errorMessage = 'Use at least one digit';
    }
  }

  if(name === ValidateName.First_name || name === ValidateName.Second_name) {
    if (!/^[a-zA-Zа-яА-Я\-]*$/.test(value)) {
      errorMessage = 'Use only Latin or Cyrillic letters';
    } else if (!/^[A-ZА-ЯЁ]{1}/.test(value)) {
      errorMessage = 'Capitalize first letter';
    }
  }

  if(name === ValidateName.Phone) {
    if (!/^[+\d]{1}[0-9]{9,14}$/.test(value)) {
      errorMessage = 'Use correct phone number';
    } else if (value.length < 4) {
      errorMessage = 'Login should contains more than 3 letters';
    }
  }
  return errorMessage;
}
