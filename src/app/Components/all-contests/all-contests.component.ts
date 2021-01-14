import {Component, OnInit, ViewChild} from '@angular/core';
import {ContestService} from '../../Services/contest.service';
import {QuestionService} from '../../Services/question.service';
import {Router} from '@angular/router';
import {MatPaginator} from '@angular/material';

@Component({
  selector: 'app-all-contests',
  templateUrl: './all-contests.component.html',
  styleUrls: ['./all-contests.component.css']
})
export class AllContestsComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  private contests: any;
  private contestsCount: number;

  constructor(private contestService: ContestService, private questionService: QuestionService, private router: Router) { }

  ngOnInit() {
    this.paginator.pageIndex = 0;
    this.paginator.pageSize = 5;
    this.getAllContests();
    this.getContestsCount();
  }

  getAllContests() {
    this.contestService.getAllContestsApi(this.paginator.pageIndex, this.paginator.pageSize).subscribe(
      res => {
        this.contests = res.result;
        console.log('res', res);
    },
    error => {
      console.log('errorMessage', error);
    });
  }

  onClick(cId: any) {
    this.router.navigate(['/contests', cId]);
  }

  getContestsCount() {
    this.contestService.getContestsCountApi().subscribe(res => {
        console.log(res);
        this.contestsCount = res.result;
        this.paginator.length = this.contestsCount;
      }
    );
  }

  onPaginatorChanged() {
    this.contestService.getAllContestsApi(this.paginator.pageIndex, this.paginator.pageSize).subscribe(res => {
      console.log(res);
      this.contests = res.result;
      this.paginator.length = this.contestsCount;
    });
  }
}
