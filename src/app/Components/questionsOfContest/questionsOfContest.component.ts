import { Component, OnInit } from '@angular/core';
import {QuestionService} from '../../Services/question.service';
import {ActivatedRoute, Params, Route, Router} from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questionsOfContest.component.html',
  styleUrls: ['./questionsOfContest.component.css']
})
export class QuestionsOfContestComponent implements OnInit {
  public startValue = 65;
  public cId: number;

  constructor(private questionService: QuestionService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe( params =>
      this.cId = params.cId
    );
    this.getAllQuestions();
  }

  getQuestionBadge(index: number) {
    return String.fromCharCode(this.startValue + index);
  }

  onClick(qId: any) {
    this.router.navigate([`/contests/${this.cId}/question`, qId]);
    // this.getAllQuestions();
  }

  getAllQuestions() {
    this.questionService.getAllQuestionsApi(this.cId).subscribe(
      res => {
        console.log('res', res);
        this.questionService.allQuestions = res.result;
        console.log('allQuestions', this.questionService.allQuestions);
      },
      error => {
        console.log('errorMessage', error);
      }
    );
  }
}
