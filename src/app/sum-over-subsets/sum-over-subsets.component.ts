import { Component, OnInit } from '@angular/core';
import {QuestionService} from '../question.service';
import {ContestService} from '../contest.service';
import * as moment from 'moment';
import {FormControl} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-sum-over-subsets',
  templateUrl: './sum-over-subsets.component.html',
  styleUrls: ['./sum-over-subsets.component.css']
})
export class SumOverSubsetsComponent implements OnInit {

  public question: any;
  public questionFile: any;
  private allQuestions: any;
  startValue = 65;
  private currentQuestion: any;
  private previousIndex: any;
  code: string;
  language: string;
  disableSelect = new FormControl(false);
  private qId: number;
  constructor(private questionService: QuestionService, private contestService: ContestService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe( params =>
      this.qId = params.qId
    );
    console.log('qId', this.qId);
    this.getQuestion();
    // this.getAllQuestions();
    this.previousIndex = 0;
  }

  getQuestion() {
    this.questionService.getQuestionApi(this.qId).subscribe(
      res => {
        console.log('res', res);
        this.question = res.result;
        this.getQuestionFile();
      },
      error => {
        console.log('errorMessage', error);
      }
    );
  }

  getQuestionFile() {
    this.questionService.getQuestionFileApi(this.qId).subscribe(
      res => {
        console.log('res', res);
        this.questionFile = res;
      },
      error => {
        console.log('errorMessage', error);
      }
    );
  }

  // getAllQuestions() {
  //   this.questionService.getAllQuestionsApi(7).subscribe(
  //     res => {
  //       console.log('res', res);
  //       this.allQuestions = res.result;
  //       this.currentQuestion = this.allQuestions[0];
  //       this.currentQuestion.isSelected = true;
  //       this.getQuestionFile();
  //       console.log('allQuestions', this.allQuestions);
  //     },
  //     error => {
  //       console.log('errorMessage', error);
  //     }
  //   );
  // }

  // getQuestionTab(index: number) {
  //   return String.fromCharCode(this.startValue + index);
  // }

  // onTabClick(i: number) {
  //   if (this.previousIndex !== i) {
  //   this.currentQuestion = this.allQuestions[i];
  //   this.allQuestions[this.previousIndex].isSelected = false;
  //   this.getQuestionFile();
  //   this.currentQuestion.isSelected = true;
  //   this.previousIndex = i;
  //   }
  // }

  submitCode() {
    console.log('lang', this.language);
    this.questionService.submitCodeApi(1, this.qId, this.language, this.code).subscribe(
      res => {
        console.log(res, 'Code submitted');
      },
      error => {
        console.log('Code submission failed failed', error);
      }
    );
  }
}
