export class Item {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  forks: number;

}


export class Items {
  total_count: number;
  items: Item[];
  next?: string;
  prev?: string;
  last?: string;
  first?: string;
}
