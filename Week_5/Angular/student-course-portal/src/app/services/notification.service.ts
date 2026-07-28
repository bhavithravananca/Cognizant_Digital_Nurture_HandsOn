import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// HANDS-ON 6, Task 2: this service is provided at COMPONENT level (see notification.component.ts),
// not root, so a fresh instance is created per NotificationComponent instance/subtree rather than
// being a single app-wide singleton. Useful when isolated per-component state is required.
@Injectable()
export class NotificationService {
  private messageSubject = new BehaviorSubject<string | null>(null);
  message$ = this.messageSubject.asObservable();

  show(message: string): void {
    this.messageSubject.next(message);
    setTimeout(() => this.messageSubject.next(null), 3000);
  }
}
