import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';

// Define interfaces for quiz and question display
interface QuizDisplay {
  quiz: string;
  questions: QuestionDisplay[];
}

interface QuestionDisplay {
  question: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Corrected styleUrl to styleUrls
})
export class AppComponent implements OnInit {
  title = 'quiz-editor';

  // Property to hold quizzes
  quizzes: QuizDisplay[] = []; // Initialize quizzes as an empty array

  constructor(public quizService: QuizService) {}

  ngOnInit() {
    // Load quizzes from the service
    const quizzes = this.quizService.loadQuizzes();
    console.log(quizzes);

    // Transform quizzes to match QuizDisplay interface
    this.quizzes = quizzes.map(x => ({
      quiz: x.name, 
      questions: x.questions.map((y: { name: any; }) => ({
        question: y.name 
      }))
    }));
    
    console.log(this.quizzes);
  }
}
