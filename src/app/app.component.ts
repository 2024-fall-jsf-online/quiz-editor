import { Component, OnInit, Input } from '@angular/core';
import { QuizService } from './quiz.service';

interface quizDisplay {
  quizName: string;
  quizQuestions: QuestionDisplay[];
  markedForDelete: boolean
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

      quizzes.subscribe(data => {
        console.log(data)
        this.quizzes = data.map((quiz: any) => ({
          quizName: quiz.name,
          quizQuestions: quiz.questions.map((question: any) => ({
            questionName: question.name
          })),
          markedForDelete: false
        }))
      }, err => {
        this.errorLoadingQuizzes = true
        console.error(err.error)
      })

      console.log(this.quizzes)
  }

  quizzes: quizDisplay[] = []
  selectedQuiz: quizDisplay | undefined = undefined

  selectQuiz = (quiz: quizDisplay) => {
    this.selectedQuiz = quiz

    console.log(quiz)
  }

  addQuiz = () => {
    const newQuiz: quizDisplay = {
      quizName: "Untitled Quiz",
      quizQuestions: [],
      markedForDelete: false
    }
    this.quizzes = [
      ...this.quizzes,
      newQuiz
    ]
    this.selectedQuiz = newQuiz
  }

  addQuestion = () => {
    if (!this.selectedQuiz) return

    const newQuestion: QuestionDisplay = {
      questionName: "Untitled Question"
    }

    this.selectedQuiz.quizQuestions = [
      ...this.selectedQuiz.quizQuestions,
      newQuestion
    ]
  }

  removeQuestion = (questionToRemove: QuestionDisplay) => {
    if (!this.selectedQuiz) return

    this.selectedQuiz.quizQuestions = this.selectedQuiz.quizQuestions.filter(question => question !== questionToRemove)
  }

  errorLoadingQuizzes = false
}
