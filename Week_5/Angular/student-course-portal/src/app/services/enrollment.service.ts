import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { CourseService } from './course.service';
import { Course } from '../models/course.model';

// HANDS-ON 6, Task 2: service-to-service injection (EnrollmentService depends on CourseService)
@Injectable({ providedIn: 'root' })
export class EnrollmentService {
  private enrolledCourseIds: number[] = [];

  constructor(private courseService: CourseService) {}

  enroll(courseId: number): void {
    if (!this.isEnrolled(courseId)) this.enrolledCourseIds.push(courseId);
  }

  unenroll(courseId: number): void {
    this.enrolledCourseIds = this.enrolledCourseIds.filter((id) => id !== courseId);
  }

  isEnrolled(courseId: number): boolean {
    return this.enrolledCourseIds.includes(courseId);
  }

  getEnrolledCourses(): Observable<Course[]> {
    return this.courseService
      .getCourses()
      .pipe(map((all) => all.filter((c) => this.enrolledCourseIds.includes(c.id))));
  }

  // HANDS-ON 8, Task 2: switchMap chains an HTTP call keyed on the currently selected course.
  // switchMap cancels the previous inner Observable if a new courseId arrives before it completes,
  // which prevents stale/out-of-order responses (e.g. rapid course switching).
  getStudentsByCourse(courseId$: Observable<number>): Observable<any> {
    return courseId$.pipe(
      switchMap((courseId) => of([{ id: 1, name: 'Demo Student', courseId }]))
    );
  }
}
