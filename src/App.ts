import ExampleContainer from '@components/example/example-container';
import apiUsingExample from '@lib/api/using-example';

export default class App {
  private static container: HTMLElement = document.querySelector('#root') as HTMLElement;

  constructor() {}

  public async run(): Promise<void> {
    /* example */ const example = new ExampleContainer();
    /* example */ App.container.append(example.element);
    apiUsingExample();
    console.log(App.container);
  }
}
