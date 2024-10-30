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

  constructor(
    public quizSvsc: QuizService
  ) {
  }

ngOnInit(): void {
    const quizzes = this.quizSvsc.loadQuizzes();
    console.log(quizzes);

    this.quizzes = quizzes.map(x => ({
      quizName: x.quizName
      , quizQuestions: x.questions.map((y: any) => ({
        questionName: y.name
      }))
    }));
    
    console.log(this.quizzes);
  }

  quizzes: QuizDisplay[] = [];

  selectedQuiz: QuizDisplay | undefined = undefined;

  selectQuiz = (q: QuizDisplay) => {
    this.selectedQuiz = q;
    console.log(this.selectedQuiz);
  }; 
}
