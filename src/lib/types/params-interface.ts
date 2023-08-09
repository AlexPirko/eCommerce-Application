export interface Params {
  tagName: string;
  classNames: string[];
  text?: '';
  components?: HTMLElement[];
  callback?: () => void;
}
