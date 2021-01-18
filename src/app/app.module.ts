import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateContestComponent } from './Components/create-contest/create-contest.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './Components/home-page/home-page.component';
import {
  MatButtonModule,
  MatCardModule, MatDatepickerModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSelectModule,
  MatSidenavModule, MatToolbarModule,
  MatNativeDateModule, MatPaginatorModule, MatTableModule, MatProgressSpinnerModule,
} from '@angular/material';
import { SumOverSubsetsComponent } from './Components/sum-over-subsets/sum-over-subsets.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxMatDatetimePickerModule, NgxMatNativeDateModule} from '@angular-material-components/datetime-picker';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AllContestsComponent } from './Components/all-contests/all-contests.component';
import { QuestionsOfContestComponent } from './Components/questionsOfContest/questionsOfContest.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateContestComponent,
    HomePageComponent,
    SumOverSubsetsComponent,
    AllContestsComponent,
    QuestionsOfContestComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    FormsModule,
    CKEditorModule,
    MatPaginatorModule,
    MatTableModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
