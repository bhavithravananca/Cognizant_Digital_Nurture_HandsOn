import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { EnrollmentService } from '../../services/enrollment.service';
import { Course } from '../../models/course.model';

// HANDS-ON 6, Task 2: injects EnrollmentService to show enrolled courses
// HANDS-ON 7, Task 2: guarded by AuthGuard (canActivate)
@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-profile.component.html',
})
export class StudentProfileComponent implements OnInit {
  enrolledCourses$!: Observable<Course[]>;

  constructor(private enrollmentService: EnrollmentService) {}

  ngOnInit(): void {
    this.enrolledCourses$ = this.enrollmentService.getEnrolledCourses();
  }
}
