import Block from 'core/Block';

export class RegistrationPage extends Block {
  render() {
    // language=hbs
    return `
    {{#Layout type="auth" }}
        <form class="form auth-form">
            <div class="auth-form__content">
                <h1 class="auth-form__title">Registration</h1>
                <div class="auth-field">
                    <input class="auth-field__input" id="email" type="email" placeholder=" " required>
                    <label class="auth-field__label" for="email">Почта</label>
                </div>
                <div class="auth-field">
                    <input class="auth-field__input" id="login" type="text" placeholder=" " required>
                    <label class="auth-field__label" for="login">Логин</label>
                    <div class="auth-field__error">Неверный логин</div>
                </div>
                <div class="auth-field">
                    <input class="auth-field__input" id="first_name" type="text" placeholder=" " required>
                    <label class="auth-field__label" for="first_name">Имя</label>
                </div>
                <div class="auth-field">
                    <input class="auth-field__input" id="second_name" type="text" placeholder=" " required>
                    <label class="auth-field__label" for="second_name">Фамилия</label>
                </div>
                <div class="auth-field">
                    <input class="auth-field__input" id="phone" type="tel" placeholder=" " required>
                    <label class="auth-field__label" for="phone">Телефон</label>
                </div>
                <div class="auth-field">
                    <input class="auth-field__input" id="password" type="password" placeholder=" " required>
                    <label class="auth-field__label" for="password">Пароль</label>
                </div>
                <div class="auth-field">
                    <input class="auth-field__input" id="confirmPassword" type="password" placeholder=" " required>
                    <label class="auth-field__label" for="confirmPassword">Пароль (еще раз)</label>
                </div>
            </div>
            <div class="auth-form__footer">
                {{{Button text="Register" onClick=onButtonClick}}}
                {{{Link class="auth-form__footer-link" text="Sign in" to="/"}}}
            </div>
        </form>
  {{/Layout}}
    `;
  }
}
