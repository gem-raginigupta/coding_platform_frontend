import { Component, OnInit } from '@angular/core';
import {QuestionService} from '../../Services/question.service';
import {ContestService} from '../../Services/contest.service';
import {ActivatedRoute} from '@angular/router';
import {MatTableDataSource} from '@angular/material';
import {interval} from 'rxjs';

@Component({
  selector: 'app-sum-over-subsets',
  templateUrl: './sum-over-subsets.component.html',
  styleUrls: ['./sum-over-subsets.component.css']
})
export class SumOverSubsetsComponent implements OnInit {

  public question: any;
  public questionFile: any;
  public allQuestions: any;
  startValue = 65;
  public currentQuestion: any;
  public previousIndex: any;
  code: string;
  public qId: number;
  languages: any = [
    {value: 'python', viewValue: 'Python'},
    {value: 'java', viewValue: 'Java'},
    {value: 'C', viewValue: 'C'},
    {value: 'C++', viewValue: 'C++'}
  ];
  selectedLanguage = this.languages[0].value;
  public verdict: string;
  public testResults: any;
  public verdictResult: any;
  public sId: number;
  isLoading = false;

  constructor(public questionService: QuestionService, public contestService: ContestService,
              private route: ActivatedRoute) {}

  public testResultListDataSource: MatTableDataSource<any>;

  displayedColumns: string[] = ['test', 'metric1', 'metric2', 'verdict'];

  ngOnInit() {
    this.route.params.subscribe( params =>
      this.qId = params.qId
    );
    console.log('qId', this.qId);
    this.getQuestion();
    this.previousIndex = 0;
    // this.getVerdict();
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
    // this.isLoading = true;
    console.log('lang', this.selectedLanguage);
    this.questionService.submitCodeApi(1, this.qId, this.selectedLanguage, this.code).subscribe(
      res => {
        this.sId = res.result;
        this.getVerdict();
        console.log(res, 'Code submitted');
      },
      error => {
        console.log('Code submission failed failed', error);
      }
    );
  }

  getVerdict() {
    this.isLoading = true;
    let int = interval(10000)
      .subscribe((val) => {
        console.log('called');
        this.questionService.getVerdictApi(this.sId).subscribe(res => {
            console.log('res', res);
            if (res.result !== null) {
              this.isLoading = false;
              this.verdictResult = res.message;
              this.verdict = res.result.verdict;
              this.testResults = JSON.parse(res.result.testResults);
              this.testResultListDataSource = new MatTableDataSource<any>(this.testResults);
              int.unsubscribe();
            }
          },
          error => {
            console.log('errorMessage', error);
          });
      });
  }
}
