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
  ) { }

  loadQuizzesFromCloud = async () => {
    try {
      const quizzes = await this.quizSvc.loadQuizzes() ?? []

      console.log(quizzes)
      this.quizzes = quizzes.map((quiz: any) => ({
        quizName: quiz.name,
        quizQuestions: quiz.questions.map((question: any) => ({
          questionName: question.name
        })),
        markedForDelete: false
      }))
    } catch (err) {
      console.error(err)
      this.errorLoadingQuizzes = true
    } finally {
      this.loading = false
    }
  }

  ngOnInit() {
    this.loadQuizzesFromCloud()
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

  jsPromiseOne = () => {
    const n = this.quizSvc.getMagicNumber(true)
    console.log(n) // promise?

    n.then(number => {
      console.log(number)

      const n2 = this.quizSvc.getMagicNumber(true)
      console.log(n2)

      n2.then(x => console.log(x)).catch(err => console.error(err))
    }).catch(err => {
      console.error(err)
    })
  }

  jsPromiseTwo = async () => {
    try {
      const x = await this.quizSvc.getMagicNumber(true)
      console.log(x)
      const y = await this.quizSvc.getMagicNumber(true)
      console.log(y)
    } catch (err) {
      console.error(err)
    }
  }

  jsPromiseThree = async () => {
    try {
      const x = this.quizSvc.getMagicNumber(true)
      console.log(x)

      const y = this.quizSvc.getMagicNumber(true)
      console.log(y)

      // const results = await Promise.all([x, y])
      const results = await Promise.race([x, y])

      console.log(results)
    } catch (err) {
      console.error(err)
    }
  }

  loading = true
}
