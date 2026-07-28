import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  providers: [NotificationService], // component-level provider -> scoped instance
  template: `
    <div class="toast" *ngIf="notificationService.message$ | async as msg">{{ msg }}</div>
  `,
  styles: [`
    .toast { background:#1a4fa0; color:#fff; padding:0.6rem 1rem; text-align:center; }
  `],
})
export class NotificationComponent {
  constructor(public notificationService: NotificationService) {}
}
