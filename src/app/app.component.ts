import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';

interface quizDisplay {
  quizName: string;
  quizQuestions: QuestionDisplay[]
}

interface QuestionDisplay {
  questionName: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'quiz-editor';

  constructor(
    public quizSvc: QuizService
  ) {}

  ngOnInit() {
      const quizzes = this.quizSvc.loadQuizzes()
      console.log(quizzes)

      this.quizzes = quizzes.map((quiz: any) => ({
        quizName: quiz.name,
        quizQuestions: quiz.questions.map((question: any) => ({
          questionName: question.name
        }))
      }))

      console.log(this.quizzes)
  }

  quizzes: quizDisplay[] = []
}
