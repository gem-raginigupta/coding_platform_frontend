import { Injectable } from '@angular/core';
import {BaseService} from '../Core/_api/base.service';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContestService {
  path = '';
  private param: HttpParams;
  public contestDetails: any;
  public questionDetails: any;
  constructor(private baseService: BaseService) { }

  createContestApi(data: any): Observable<any> {
    this.path = 'create-contest/';
    return this.baseService.post(this.path, data);
  }

  createQuestionApi(formData: FormData): Observable<any> {
    this.path = 'create-question/';
    return this.baseService.postFormData(this.path, formData);
  }

  uploadTestCaseApi(qId: number, formData: FormData): Observable<any> {
    this.path = 'bulkupload-testcase/' + qId;
    return this.baseService.postFormData(this.path, formData);
  }

  getAllContestsApi(pageNo: number, pageSize: number): Observable<any> {
    this.path = `get-contests/${pageNo}/${pageSize}`;
    return this.baseService.get(this.path);
  }

  getContestsCountApi(): Observable<any> {
    this.path = `get-contestscount/`;
    return this.baseService.get(this.path);
  }
}
