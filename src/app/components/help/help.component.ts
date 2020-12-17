import {Component, OnInit} from '@angular/core';

class QuestionAnswer {
  question: string;
  answer: string;
  isOpened = false;
}

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.less']
})
export class HelpComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  private _questions: QuestionAnswer[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this._questions.push(
    //   {
    //     question: 'Я не могу зарегистрироваться',
    //     answer: 'Плохо стараешься.'
    //   },
    //   {
    //     question: 'Как жить?',
    //     answer: 'Через страдания.'
    //   },
    //   {
    //     question: 'В чем смысл жизни?',
    //     answer: 'Тоже через страдания.'
    //   }
     );
  }

  get questions(): QuestionAnswer[] {
    return this._questions;
  }

  public openQuestion(question: QuestionAnswer): void {
    for (const currentQuestion of this.questions) {
      if (currentQuestion.question === question.question) {
        currentQuestion.isOpened = !currentQuestion.isOpened;
        return;
      }
    }
  }

}
