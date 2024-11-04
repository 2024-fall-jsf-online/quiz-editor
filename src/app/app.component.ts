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
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'quiz-editor';

  constructor(public quizSvc: QuizService) {
  }

  ngOnInit() {
    const quizzes = this.quizSvc.loadQuizzes();
    console.log(quizzes);

    this.quizzes = quizzes.map((x: any) => ({
      quizName: x.name
      , quizQuestions: x.questions.map((y: any) => ({
        questionName: y.name
      }))
    }));

    console.log(this.quizzes);
  }

  quizzes: QuizDisplay[] = [];

  //Method to select a quiz
  selectedQuiz: QuizDisplay | undefined = undefined;
  
  selectQuiz = (q: QuizDisplay) => {
    this.selectedQuiz = q;

    console.log(this.selectedQuiz);
  };

  //Method to add a new quiz
  addNewQuiz() {
    const newQuiz: QuizDisplay = {
      quizName: 'Untitled Quiz',
      quizQuestions: []
    };
    this.quizzes = [...this.quizzes, newQuiz];
    this.selectedQuiz = newQuiz;
    console.log('New Quiz Added: ', this.selectedQuiz);

  }
}
