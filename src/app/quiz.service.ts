import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor() { }

  loadQuizzes() {
    // Mock data for quizzes
    return [
      {
        name: 'Quiz 1',
        questions: [
          { name: 'Question 1' },
          { name: 'Question 2' }
        ]
      },
      {
        name: 'Quiz 2',
        questions: []
      },
      {
        name: 'Math Quiz',
        questions: [
          { name: 'What is 2+2?' }
        ]
      },
      {
        name: 'Science Quiz',
        questions: [
          { name: 'What is H2O?' }
        ]
      }
    ];
  }
}
