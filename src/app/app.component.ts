import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';

interface QuizDisplay {
  quizName: string;
  quizQuestions: QuestionDisplay[];
}

interface QuestionDisplay {
  questionName: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'quiz-editor';
  quizzes: QuizDisplay[] = [];

  constructor(public quizSvc: QuizService) {}

  ngOnInit() {
    const quizzes = this.quizSvc.loadQuizzes();
    console.log(quizzes);

    // Check if quizzes is defined and is an array
    if (Array.isArray(quizzes)) {
      this.quizzes = quizzes.map(x => ({
        quizName: x.name,
        quizQuestions: Array.isArray(x.question)
          ? x.question.map((y: any) => ({
              questionName: y.name,
            }))
          : []
      }));
    }

    console.log(quizzes);
  }
    selectedQuiz: QuizDisplay | undefined = undefined;
    selectQuiz = (q: QuizDisplay) => {
      this.selectedQuiz = q;
      console.log(this.selectedQuiz);
    };
}










/* import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';

interface QuizDisplay {
  quizName: string;
  quizQuestions: QuestionDisplay[];
}

interface QuestionDisplay {
  questionName: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'quiz-editor';

  constructor(
    public quizSvc: QuizService
  ) {
  }

  ngOnInit() {
      const quizzes = this.quizSvc.loadQuizzes();
      console.log(quizzes);

      this.quizzes = quizzes.map(x => ({
        quizName: x.name
        , quizQuestions: x.question.map((y: any) => ({
          questionName: y.name
        }))
      }));

      console.log(this.quizzes);
  }

  quizzes: QuizDisplay[] = [];
} */
