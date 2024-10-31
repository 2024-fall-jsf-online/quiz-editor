import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel

// Define interfaces for quiz and question display
interface QuizDisplay {
  quizName: string;
  quizQuestions: QuestionDisplay[];
}

interface QuestionDisplay {
  question: string;
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

  constructor(public quizService: QuizService) {}

  ngOnInit() {
    // Load quizzes from the service
    const quizzes = this.quizService.loadQuizzes();
    console.log(quizzes);

    // Transform quizzes to match QuizDisplay interface
    this.quizzes = quizzes.map(x => ({
      quizName: x.name,
      quizQuestions: x.questions.map((y: { name: any; }) => ({
        question: y.name
      }))
    }));
    
    console.log(this.quizzes);
  }

  selectQuiz = (q: QuizDisplay) => {
    this.selectedQuiz = q;
    console.log(this.selectedQuiz);
  }

  addNewQuiz() {
    const newQuiz: QuizDisplay = {
      quizName: 'Untitled Quiz',
      quizQuestions: []
    };

    // Add the new quiz and select it
    this.quizzes = [...this.quizzes, newQuiz];
    this.selectedQuiz = newQuiz;
  }
}
