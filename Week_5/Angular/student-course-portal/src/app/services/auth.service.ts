import { Injectable } from '@angular/core';

// HANDS-ON 7, Task 2: hardcoded auth state consumed by AuthGuard
@Injectable({ providedIn: 'root' })
export class AuthService {
  isLoggedIn = true; // toggle to false to see the guard redirect in action
}
