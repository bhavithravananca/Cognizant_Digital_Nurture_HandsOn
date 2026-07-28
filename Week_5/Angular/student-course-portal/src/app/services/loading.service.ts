import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// HANDS-ON 8, Task 3: shared loading state, flipped by loadingInterceptor, read via async pipe
@Injectable({ providedIn: 'root' })
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.loadingSubject.asObservable();

  setLoading(loading: boolean): void {
    this.loadingSubject.next(loading);
  }
}
