import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Items} from './projects/project.model';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private API_PATH = 'https://api.github.com/search/repositories?q=h+language:vue&sort=stars&order=desc';


  constructor(private http: HttpClient) {
  }


  getProjects(params?: HttpParams) {
    const items = new Items;
    this.http
      .get(`${this.API_PATH}`, {observe: 'response', params: params})
      .subscribe(resp => {
        items.items = resp.body['items'];
        items.total_count = resp.body['total_count'];
        const links = this.parseLinks(resp.headers.get('Link'));
        console.log('huh', links);
        if (links['next']) {
          items.next = links['next'];
        }
        if (links['prev']) {
          items.prev = links['prev'];
        }
        if (links['last']) {
          items.last = links['last'];
        }
        if (links['first']) {
          items.first = links['first'];
        }

      });
    return items;
  }

  getProjectsFromLink(url: string) {
    const items = new Items;
    this.http
      .get(url, {observe: 'response'})
      .subscribe(resp => {
        items.items = resp.body['items'];
        items.total_count = resp.body['total_count'];
        const links = this.parseLinks(resp.headers.get('Link'));
        if (links['next']) {
          items.next = links['next'];
        }
        if (links['prev']) {
          items.prev = links['prev'];
        }
        if (links['last']) {
          items.last = links['last'];
        }
        if (links['first']) {
          items.first = links['first'];
        }
      });
    return items;
  }

  private parseLinks(header) {
    if (header.length === 0) {
      return;
    }
    const parts = header.split(',');
    const links = {};
    for (const p of parts) {
      const section = p.split(';');
      if (section.length !== 2) {
        throw new Error('section could not be split on');
      }
      const url = section[0].replace(/<(.*)>/, '$1').trim();
      const name = section[1].replace(/rel="(.*)"/, '$1').trim();
      switch (name) {
        case 'first':
          links['first'] = url;
          break;
        case 'next':
          links['next'] = url;
          break;
        case 'last':
          links['last'] = url;
          break;
        case 'prev':
          links['prev'] = url;
          break;
        default:

      }

    }
    return links;
  }

}
