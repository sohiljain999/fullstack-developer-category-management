export interface Category {
  _id: string;
  name: string;
  parent: string;
  ancestors: Ancestors[],
  childNodes: Category[]
}

interface Ancestors {
  _id: number;
  name: string;
}
