import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';

interface QuizDisplay {
  quizName: string;
  quizQuestions: QuestionDisplay[];
  markedForDelete: boolean;
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
  selectedQuiz: QuizDisplay | undefined;
  errorLoadingQuizzes = false;

  constructor(public quizSvc: QuizService) {}

  ngOnInit() {
    this.loadQuizzesFromCloud();
  }

  // Load quizzes asynchronously
  loadQuizzesFromCloud = async () => {
    try {
      const quizzes = await this.quizSvc.loadQuizzes();
      this.quizzes = quizzes.map(x => ({
        quizName: x.name || 'Unnamed Quiz',  // Fallback for missing quiz name
        quizQuestions: (x.questions || []).map(y => ({
          questionName: y.name || 'Unnamed Question'  // Fallback for missing question name
        })),
        markedForDelete: false
      }));
    } catch (err) {
      console.error('Error loading quizzes:', err);
      this.errorLoadingQuizzes = true;
    }
  };

  // Select a quiz for editing
  selectQuiz = (q: QuizDisplay) => {
    this.selectedQuiz = q;
    console.log(this.selectedQuiz);
  };

  // Add a new quiz
  addNewQuiz = () => {
    const newQuiz: QuizDisplay = {
      quizName: 'Untitled Quiz',
      quizQuestions: [],
      markedForDelete: false
    };

    this.quizzes = [...this.quizzes, newQuiz];
    this.selectedQuiz = newQuiz;
  };

  // Add a new question to the selected quiz
  addNewQuestion = () => {
    if (this.selectedQuiz) {
      this.selectedQuiz.quizQuestions = [
        ...this.selectedQuiz.quizQuestions,
        { questionName: 'Untitled Question' }
      ];
    }
  };

  // Remove a question from the selected quiz
  removeQuestion = (questionToRemove: QuestionDisplay) => {
    if (this.selectedQuiz) {
      this.selectedQuiz.quizQuestions = this.selectedQuiz.quizQuestions.filter(
        question => question !== questionToRemove
      );
    }
  };

  // Handle promises with different approaches
  jsPromisesOne = () => {
    const n = this.quizSvc.getMagicNumber(true);
    n.then(number => {
      console.log(number);
      return this.quizSvc.getMagicNumber(true);
    })
    .then(number2 => console.log(number2))
    .catch(err => console.error(err));
  };

  jsPromisesTwo = async () => {
    try {
      const x = await this.quizSvc.getMagicNumber(true);
      console.log(x);

      const y = await this.quizSvc.getMagicNumber(true);
      console.log(y);
    } catch (err) {
      console.error('Promise error:', err);
    }
  };

  jsPromisesThree = async () => {
    try {
      const [x, y] = await Promise.all([
        this.quizSvc.getMagicNumber(true),
        this.quizSvc.getMagicNumber(true)
      ]);
      console.log([x, y]);
    } catch (err) {
      console.error('Error loading promises:', err);
    }
  };

  // Cancel changes and reload quizzes from the cloud
  cancelAllChanges = () => {
    this.loadQuizzesFromCloud();
    this.selectedQuiz = undefined;  
  };
  getDeletedQuizzes = () => {
    return this.quizzes.filter(x => x.markedForDelete);
  };
  get deletedQuizCount() {
    return this.getDeletedQuizzes().length;
  }
}
