import { Injectable } from '@angular/core';
import {HttpHeaders, HttpParams} from '@angular/common/http';
import {BaseService} from './Core/_api/base.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  allQuestions: any;
  private path = '';
  private param: HttpParams;
  private headers = new HttpHeaders();
  constructor(private baseService: BaseService) { }

  getQuestionApi(qId: number): Observable<any> {
    this.path = `get-question/${qId}`;
    return this.baseService.get(this.path);
  }

  getQuestionFileApi(qId: number): Observable<any> {
    this.path = `get-questionfile/${qId}`;
    return this.baseService.getTextFormat(this.path);
  }

  getAllQuestionsApi(cId: number): Observable<any> {
    this.path = `get-questionbycid/${cId}`;
    return this.baseService.get(this.path);
  }

  submitCodeApi(uId: number, qId: number, language: string, data: any): Observable<any> {
    this.path = `submit-code/${uId}/${qId}?language=${language}`;
    console.log('path', this.path);
    return this.baseService.post(this.path, data);
  }

  getQuestionsCountApi(): Observable<any> {
    this.path = `get-questioncount/`;
    return this.baseService.get(this.path);
  }
}
