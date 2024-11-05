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
  selectedQuiz: QuizDisplay | undefined = undefined;

  constructor(public quizSvc: QuizService) {}

  ngOnInit() {
    const quizzes = this.quizSvc.loadQuizzes();
    console.log(quizzes);
    this.quizzes = quizzes.map((x: any) => ({
      quizName: x.name,
      quizQuestions: (x.questions || []).map((y: any) => ({
        questionName: y.name
      }))
    }));
    console.log(this.quizzes);
  }

  // Method to select a quiz
  selectQuiz = (q: QuizDisplay) => {
    this.selectedQuiz = q;
    console.log(this.selectedQuiz);
  };

  // Method to add a new quiz (first version) and below is also another way
  addNewQuiz = () => {
    const newQuiz: QuizDisplay = {
      quizName: 'Untitled Quiz',
      quizQuestions: []
    };
    this.quizzes = [...this.quizzes, newQuiz];
    this.selectedQuiz = newQuiz;
    console.log('New Quiz Added:', this.selectedQuiz);
  };

  /*this also works
  // Method to add a new quiz (second version)
  addNewQuiz = () => {
    const newQuiz: QuizDisplay = {
      quizName: 'New Quiz !!!',
      quizQuestions: []
    };
    this.quizzes = [...this.quizzes, newQuiz];
    this.selectedQuiz = newQuiz;
    console.log('New Quiz Added:', this.selectedQuiz);
  };
  */
}
