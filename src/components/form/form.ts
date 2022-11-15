import {Block} from 'core';
type FormProps = {
  events?: Indexed;
  onSubmit?: () => void;
  class?: string;
}

export default class Form extends Block<FormProps> {
  static componentName = 'Form';
  constructor({onSubmit, ...props}: FormProps) {
    super(props);

    this.setProps({
      events: {
        submit: onSubmit
      }
    })
  }

  protected render(): string {
    // language=hbs
    return `
      <form>
          <div class="{{class}}" data-slot=1></div>
      </form>
    `
  }
}
