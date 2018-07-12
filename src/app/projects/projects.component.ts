import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {HttpParams} from '@angular/common/http';


@Component({
  selector: 'gpe-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {

  items;
  searchForm: FormGroup;
  loading = false;

  constructor(private api: ApiService) {
    this.searchForm = new FormGroup({
      searchTerm: new FormControl(),
      language: new FormControl(),
      sort: new FormControl()
    });

  }


  getProjectsUrl(url) {
    this.items = this.api.getProjectsFromLink(url);
  }

  onSubmit() {
    this.loading = true;
    const q = this.searchForm.controls['searchTerm'].value;
    const language = this.searchForm.controls['language'].value;
    const sort = this.searchForm.controls['sort'].value;
    const params = new HttpParams()
      .set('q', q + '+language:' + language)
      .set('sort', sort);

    this.items = this.api.getProjects(params);

    if (this.searchForm.invalid) {
      return;
    }

  }


}
