import Block from 'core/Block';

export class LoginPage extends Block {

  render() {
    // language=hbs
    return `
    {{#Layout type="auth" }}
        <form class="form auth-form">
            <div class="auth-form__content">
                <h1 class="auth-form__title">Вход</h1>
                <div class="auth-field">
                    <input class="auth-field__input" id="login" type="text" placeholder=" " required>
                    <label class="auth-field__label" for="login">Логин</label>
                    <div class="auth-field__error">Неверный логин</div>
                </div>
                <div class="auth-field">
                    <input class="auth-field__input" id="pass" type="password" placeholder=" " required>
                    <label class="auth-field__label" for="pass">Пароль</label>
                </div>
            </div>
            <div class="auth-form__footer">
                <button class="auth-form__submit" type="submit">Авторизоваться</button>
                <a href="../signin/signin.hbs" class="auth-form__footer-link">Нет аккаунта?</a>
            </div>
        </form>
  {{/Layout}}
    `;
  }
}
