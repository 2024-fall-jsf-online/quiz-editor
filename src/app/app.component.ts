import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';

// Define interfaces for quiz and question display
interface QuizDisplay {
  quizName: string; // Property in the interface
  quizQuestions: QuestionDisplay[]; // Property in the interface
}

interface QuestionDisplay {
  question: string; // Property in the interface
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent implements OnInit {
  title = 'quiz-editor';


  constructor(public quizService: QuizService) {}

  ngOnInit() {
    // Load quizzes from the service
    const quizzes = this.quizService.loadQuizzes();
    console.log(quizzes);

    // Transform quizzes to match QuizDisplay interface
    this.quizzes = quizzes.map(x => ({
      quizName: x.name, // Use 'quizName' to match QuizDisplay
      quizQuestions: x.questions.map((y: { name: any; }) => ({ // Use 'quizQuestions'
        question: y.name // This matches the QuestionDisplay interface
      }))
    }));
    
    console.log(this.quizzes);
  }

   // Property to hold quizzes
   quizzes: QuizDisplay[] = [];

  selecedQuiz: QuizDisplay | undefined = undefined;

  selectQuiz = (q: QuizDisplay) =>{
    this.selecedQuiz = q;
    console.log(this.selecedQuiz);
  }
}
