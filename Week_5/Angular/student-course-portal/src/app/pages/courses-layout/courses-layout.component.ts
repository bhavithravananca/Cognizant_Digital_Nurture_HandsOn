import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// HANDS-ON 7, Task 1: parent for nested routes /courses (list) and /courses/:id (detail)
@Component({
  selector: 'app-courses-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
})
export class CoursesLayoutComponent {}
