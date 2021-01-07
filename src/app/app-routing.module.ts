import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateContestComponent} from './create-contest/create-contest.component';
import {SumOverSubsetsComponent} from './sum-over-subsets/sum-over-subsets.component';
import {AllContestsComponent} from './all-contests/all-contests.component';
import {QuestionsOfContestComponent} from './questionsOfContest/questionsOfContest.component';


const routes: Routes = [
  {
    path: 'create',
    component: CreateContestComponent
  },
  {
    path: 'sum',
    component: SumOverSubsetsComponent
  },
  {
    path: 'contests',
    component: AllContestsComponent,
  },
  {
    path: 'contests/:cId',
    component: QuestionsOfContestComponent,
  },
  {
    path: 'contests/:cId/question/:qId',
    component: SumOverSubsetsComponent,
  }
  // {
  //   path: 'contests',
  //   component: AllContestsComponent,
  //   children: [{
  //     path: ':cId',
  //     component: QuestionsOfContestComponent,
  //   },
  //     {
  //       path: ':cId/questions/:qId',
  //       component: SumOverSubsetsComponent,
  //     }
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
