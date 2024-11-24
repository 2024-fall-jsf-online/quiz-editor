import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

// Define the structure for quizzes from the backend
export interface QuizFromWeb {
  name: string;
  questions: {
    name: string;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  constructor(private httpClient: HttpClient) {}  // Corrected variable name

<<<<<<< Updated upstream
  constructor( 
    private anglulaHttpClient:HttpClient
  ) { }

  loadQuizzes = () => {

    const quizzesFromWeb = lastValueFrom(
    this.anglulaHttpClient.get<QuizFromWeb[]>(
      "https://modern-js.azurewebsites.net/api/HttpTriggerJS1?code=8XD3vN3ehHLdZacBQJQhgUnNst9202gdd5VM3kWCytDkz2nXhia6kA==&name=Jemal%20"
    )
  );
=======
  loadQuizzes() {
    // Returns an observable of an array of QuizFromWeb
    return this.httpClient.get<QuizFromWeb[]>(
      "https://modern-js.azurewebsites.net/api/HttpTriggerJS1?code=8XD3vN3ehHLdZacBQJQhgUnNst9202gdd5VM3kWCytDkz2nXhia6kA==&name=Jemal%20"
    );
  }
>>>>>>> Stashed changes

  getMagicNumber(callerWantsToSucceed: boolean): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      // Simulating long-running process
      if (callerWantsToSucceed) {
        resolve(42);  // Simulate success
      } else {
        reject("Error");  // Simulate failure
      }
    });
  }
}
