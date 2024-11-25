import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';

interface QuizDisplay {
  quizName: string;
  quizQuestions: QuestionDisplay[];
  markedForDelete: boolean;
  newlyAddedQuiz: boolean;
  naiveQuizChecksum: string;
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
  loading = true;
  errorLoadingQuizzes = false;

  constructor(public quizSvc: QuizService) {}

  generateNaiveQuizChecksum = (quiz: any) => {
    return quiz.name + quiz.questions.map((x: any) => '~' + x.name).join('');
  };

  ngOnInit() {
    this.loadQuizzesFromCloud();
  }

  // Load quizzes asynchronously
  loadQuizzesFromCloud = async () => {
    try {
      this.loading = true;
      const quizzes = await this.quizSvc.loadQuizzes();
      console.log(quizzes);
      this.quizzes = quizzes.map((x: any) => ({
        quizName: x.name,
        quizQuestions: x.questions.map((y: any) => ({
          questionName: y.name
        })),
        markedForDelete: false,
        newlyAddedQuiz: false,  // Corrected typo: was newelyAddedQuiz
        naiveQuizChecksum: this.generateNaiveQuizChecksum(x)
      }));
      this.loading = false;  // Set loading to false after successful load
    } catch (err) {
      console.error('Error loading quizzes:', err);
      this.errorLoadingQuizzes = true;
      this.loading = false;  // Set loading to false on error
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
      markedForDelete: false,
      newlyAddedQuiz: true,  // Corrected typo: was newelyAddedQuiz
      naiveQuizChecksum: ""
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
    n.then((number: number) => {
      console.log(number);
      return this.quizSvc.getMagicNumber(true);
    })
    .then((number2: number) => console.log(number2))
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

  getAddedQuizzes = () => {
    return this.quizzes.filter(x => 
      x.newlyAddedQuiz && !x.markedForDelete);
  };

  get addedQuizCount() {
    return this.getAddedQuizzes().length;
  }

  getEditedQuizzes = () => {
    return this.quizzes.filter(x => 
      x.quizName + x.quizQuestions.map(y => '~' + y.questionName).join('') !== x.naiveQuizChecksum
      && !x.newlyAddedQuiz 
      && !x.markedForDelete
    );
  };

  get editedQuizCount() {
    return this.getEditedQuizzes().length;
  }
}
