import ComponentContainer from '@lib/abstracts/component-container';
import { Params } from '@lib/types/params-interface';
import ExampleComponent from './example-component/example';

const params: Params = {
  tagName: 'div',
  classNames: ['example-container'],
  components: [new ExampleComponent().element],
};

export default class ExampleContainer extends ComponentContainer {
  constructor() {
    super(params);
  }
}
