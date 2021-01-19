import {Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewChildren} from '@angular/core';
import {ContestService} from '../../Services/contest.service';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import * as moment from 'moment';
import {MatDialog} from '@angular/material';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-create-contest',
  templateUrl: './create-contest.component.html',
  styleUrls: ['./create-contest.component.css'],
})
export class CreateContestComponent implements OnInit {
  // @ViewChild('ques', {static: false}) questionData: ElementRef;
  // tslint:disable-next-line:variable-name
  @ViewChildren('testCase') test_case: ElementRef;
  @ViewChildren('output') output: ElementRef;
  questionData: any = '';
  contestFormGroup: FormGroup;
  questionFormGroup: FormGroup;
  currentQuestion: QuestionTab;
  fileArray: File[] = [];
  testCases: string[] = [''];
  public htmlFile: any = File;
  startValue = 65;
  previousIndex = 0;
  questionTab: QuestionTab[] = [];
  filename = '';
  testCaseFiles: FileList;
  public Editor = ClassicEditor;

  constructor(private formBuilder: FormBuilder, public contestService: ContestService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.contestFormGroup = this.formBuilder.group({
      contestName: [''],
      start_date: [''],
      end_date: [''],
      instructions: [''],
      description: [''],
    });

    this.questionFormGroup = this.formBuilder.group({
      title: [''],
      marks: [''],
      timeSec: [''],
      memoryKB: [''],
      example: this.formBuilder.array([])
    });
    this.addMoreExample();
  }

  exampleFormGroup() {
    const example = this.formBuilder.group({
      exampleInput: [''],
      exampleOutput: [''],
      exampleDesc: ['']
    });
    return example;
  }

  get getExampleFormArray() {
    return this.questionFormGroup.controls.example as FormArray;
  }

  addMoreExample() {
    if (this.getExampleFormArray.length < 3) {
      const example = this.exampleFormGroup();
      this.getExampleFormArray.push(example);
    }
  }

  removeExampleFormArray(index) {
    this.getExampleFormArray.removeAt(index);
  }

  createContest() {
    if (this.contestFormGroup.valid) {
      const element = {
        cId: 0,
        contestName: this.contestFormGroup.get('contestName').value,
        startDate: moment(this.contestFormGroup.get('start_date').value).format('DD/MM/yyyy HH:MM:SS'),
        endDate: moment(this.contestFormGroup.get('end_date').value).format('DD/MM/yyyy HH:MM:SS'),
        instructions: this.contestFormGroup.get('instructions').value,
        description: this.contestFormGroup.get('description').value,
        rowInsertedBy: 'Ragini',
        rowInsertedDate: '20/12/2020 20:20:20',
        rowUpdatedBy: 'Ragini',
        rowUpdatedDate: '20/12/2020 20:20:20',
        setterName: 'Ragini'
      };
      console.log(element.startDate);
      console.log(element.endDate);
      this.contestService.createContestApi(element).subscribe(
        res => {
          this.contestService.contestDetails = res.result;
          // this.contestFormGroup.controls.contestName.setValue(this.contestService.contestDetails.contestName);
          // this.contestFormGroup.controls.startDate.setValue(this.contestService.contestDetails.start_date);
          // this.contestFormGroup.controls.endDate.setValue(this.contestService.contestDetails.end_date);
          // this.contestFormGroup.controls.instructions.setValue(this.contestService.contestDetails.instructions);
          // this.contestFormGroup.controls.description.setValue(this.contestService.contestDetails.description);
          console.log(res, 'Contest created');
        },
        error => {
          console.log('Contest creation failed', error);
        }
      );
    }
  }

  getQuestionTab(index: number) {
    return String.fromCharCode(this.startValue + index);
  }

  addQuestionClick() {
    if (this.questionTab.length < 3) {
      const ques = {
        isSelected: false, title: '', marks: '', timeSec: 0, memoryKB: 0, questionFile: '', exampleInput1: '',
        exampleOutput1: '', exampleDesc1: '', exampleInput2: '', exampleOutput2: '', exampleDesc2: '', exampleInput3: '',
        exampleOutput3: '', exampleDesc3: ''
      };
      this.questionTab.push(ques);
      if (this.questionTab.indexOf(ques) === 0) {
        ques.isSelected = true;
        this.currentQuestion = ques;
      }
    } else {
      console.log('no more questions');
    }
  }

  onTabClick(i: number) {
    this.currentQuestion = this.questionTab[i];
    // this.questionTab[this.previousIndex].questionFile = this.questionData.nativeElement.innerHTML;
    this.questionTab[this.previousIndex].questionFile = this.questionData;
    this.questionTab[this.previousIndex].isSelected = false;
    if (this.previousIndex !== i) {
      this.questionData = '';
    }
    this.currentQuestion.isSelected = true;
    this.previousIndex = i;
    // console.log('Index', i);
    // console.log('PreviousIndex', this.previousIndex);
    // this.questionTab[this.previousIndex].isSelected = false;
    // this.questionTab[i].isSelected = true;
    // console.log('tab', this.questionTab);
    // this.previousIndex = i;
  }

  createQuestion() {
    const element = {
      cId: this.contestService.contestDetails.cId,
      title: this.questionFormGroup.get('title').value,
      exampleInput1: this.getExampleFormArray.controls[0].get('exampleInput').value,
      exampleOutput1: this.getExampleFormArray.controls[0].get('exampleOutput').value,
      exampleDesc1: this.getExampleFormArray.controls[0].get('exampleDesc').value,
      exampleInput2: this.checkExampleLength(1) ? this.getExampleFormArray.controls[1].get('exampleInput').value : null,
      exampleOutput2: this.checkExampleLength(1) ? this.getExampleFormArray.controls[1].get('exampleOutput').value : null,
      exampleDesc2: this.checkExampleLength(1) ? this.getExampleFormArray.controls[1].get('exampleDesc').value : null,
      exampleInput3: this.checkExampleLength(2) ? this.getExampleFormArray.controls[2].get('exampleInput').value : null,
      exampleOutput3: this.checkExampleLength(2) ? this.getExampleFormArray.controls[2].get('exampleOutput').value : null,
      exampleDesc3: this.checkExampleLength(2) ? this.getExampleFormArray.controls[2].get('exampleDesc').value : null,
      timeSec: this.questionFormGroup.get('timeSec').value,
      memoryKB: this.questionFormGroup.get('memoryKB').value,
      rowInsertedBy: 'Ragini',
      rowInsertedDate: '20/12/2020 20:20:20',
      rowUpdatedBy: 'Ragini',
      rowUpdatedDate: '20/12/2020 20:20:20',
    };
    console.log('element', element);
    const file = new Blob([this.questionData], {type: 'text/plain'});
    this.htmlFile = new File([file], 'htmlContent.html');
    const formData = new FormData();
    formData.append('questionObj', JSON.stringify(element));
    formData.append('questionFile', this.htmlFile);
    console.log('file', this.htmlFile);
    console.log('formData', formData);
    console.log('data', this.questionData);
    this.contestService.createQuestionApi(formData).subscribe(
      res => {
        this.contestService.questionDetails = res.result;
        console.log(res, 'Question created');
      },
      error => {
        console.log('Question creation failed', error);
      }
    );
  }

  checkExampleLength(index: number): boolean {
   return this.getExampleFormArray.controls.length >= index + 1 ? true : false;
  }

  // createTestCase() {
  //   this.test_case.toArray().forEach((test, i) => {
  //     const tcFile = new Blob([test.nativeElement.innerHTML], {type: 'text/plain'});
  //     const file1 = new File([tcFile], 'test' + i + 1 + '.html');
  //     this.fileArray.push(file1);
  //     console.log('test', test.nativeElement.innerHTML);
  //   });
  //   this.output.toArray().forEach((out, j) => {
  //     const outFile = new Blob([out.nativeElement.innerHTML], {type: 'text/plain'});
  //     const file2 = new File([outFile], 'out' + j + 1 + '.html');
  //     this.fileArray.push(file2);
  //     console.log('out', out.nativeElement.innerHTML);
  //   });
  //   const formData = new FormData();
  //   this.fileArray.forEach(file => formData.append('files', file));
  //   this.contestService.createTestCaseApi(this.questionDetails.questionId, formData).subscribe(
  //     res => {
  //       console.log(res, 'Testcase created');
  //     },
  //     error => {
  //       console.log('Testcase creation failed', error);
  //     }
  //   );
  // }

  uploadTestCase() {
    const formData = new FormData();
    // this.testCaseFiles.forEach((file, i) => formData.append('files', file[i]));
    const tcFiles = Array.from(this.testCaseFiles);
    for (let i; i <= tcFiles.length; i++) {
      // const file: File = this.testCaseFiles[i];
      const file: File = tcFiles[i];
      formData.append('files', file);
    }
    console.log('tc index', tcFiles[1]);
    // for (const file of this.testCaseFiles) {
    //   formData.append('files', file, file.get);
    // }
    console.log('tcFile', this.testCaseFiles);
    this.contestService.uploadTestCaseApi(this.contestService.questionDetails.qId, formData).subscribe(
        res => {
          console.log(res, 'Testcase uploaded');
        },
        error => {
          console.log('Testcase uploading failed', error);
        }
      );
  }

  addTestCase() {
    this.testCases.push('');
  }

  onUpdate(templateRef: TemplateRef<any>) {
    const dialogRef = this.dialog.open(templateRef, {
      width: '500px',
      height: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onSelectedFile(event) {
    this.testCaseFiles = event.target.files;
    // for (let i; i <= event.target.files.length; i++) {
    //   this.testCaseFiles.push(event.target.files[i]);
    // }
    console.log('tc files are--->', this.testCaseFiles);
  }
}

export interface QuestionTab {
  isSelected: boolean;
  title: string;
  marks: string;
  timeSec: number;
  memoryKB: number;
  questionFile: string;
  exampleInput1: string;
  exampleOutput1: string;
  exampleDesc1: string;
  exampleInput2: string;
  exampleOutput2: string;
  exampleDesc2: string;
  exampleInput3: string;
  exampleOutput3: string;
  exampleDesc3: string;
}
