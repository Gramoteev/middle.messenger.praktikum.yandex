import Block from './block';
import Handlebars, { HelperOptions } from 'handlebars';

type BlockConstructable<Props = any> = {
  new(props: Props): Block<Record<string, any>>;
  componentName: string;
}

export default function registerComponent<Props extends any>(Component: BlockConstructable<Props>) {
  Handlebars.registerHelper(Component.componentName || Component.name, function (this: Props, { hash: { ref, ...hash }, data, fn }: HelperOptions) {
    if (!data.root.children) {
      data.root.children = {};
    }

    if (!data.root.refs) {
      data.root.refs = {};
    }

    const { children, refs } = data.root;

    (Object.keys(hash) as any).forEach((key: keyof Props) => {
      if (this[key] && typeof this[key] === 'string') {
        // @ts-ignore
        hash[key] = hash[key].replace(new RegExp(`{{${key}}}`, 'i'), this[key]);
      }
    });

    const component = new Component(hash);

    children[component.id] = component;

    if (ref) {
      refs[ref] = component;
    }

    const contents = fn ? fn(this): '';

    return `<div data-id="${component.id}">${contents}</div>`;
  })
}
