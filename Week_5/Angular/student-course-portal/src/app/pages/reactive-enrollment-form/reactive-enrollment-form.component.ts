import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { CanComponentDeactivate } from '../../guards/unsaved-changes.guard';

// HANDS-ON 5: reactive form built with FormBuilder, custom sync + async validators, FormArray
// HANDS-ON 7, Task 2: implements CanComponentDeactivate for the unsavedChangesGuard

// Custom synchronous validator: disallow course codes starting with 'XX'
export function noCourseCode(control: AbstractControl): ValidationErrors | null {
  const value = String(control.value ?? '');
  return value.startsWith('XX') ? { noCourseCode: true } : null;
}

// Custom async validator: simulate an "email already taken" check
export function simulateEmailCheck(control: AbstractControl): Observable<ValidationErrors | null> {
  const taken = String(control.value ?? '').includes('test@');
  return of(taken ? { emailTaken: true } : null).pipe(delay(800));
}

@Component({
  selector: 'app-reactive-enrollment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-enrollment-form.component.html',
  styleUrl: './reactive-enrollment-form.component.css',
})
export class ReactiveEnrollmentFormComponent implements OnInit, CanComponentDeactivate {
  enrollForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.enrollForm = this.fb.group({
      studentName: ['', [Validators.required, Validators.minLength(3)]],
      studentEmail: this.fb.control('', {
        validators: [Validators.required, Validators.email],
        asyncValidators: [simulateEmailCheck],
      }),
      courseId: [null, [Validators.required, noCourseCode]],
      preferredSemester: ['Odd', Validators.required],
      agreeToTerms: [false, Validators.requiredTrue],
      additionalCourses: this.fb.array([]),
    });
  }

  // HANDS-ON 5, Task 2: typed getter avoids repeated casting inside the template
  get additionalCourses(): FormArray {
    return this.enrollForm.get('additionalCourses') as FormArray;
  }

  addCourse(): void {
    this.additionalCourses.push(this.fb.control('', Validators.required));
  }

  removeCourse(index: number): void {
    this.additionalCourses.removeAt(index);
  }

  onSubmit(): void {
    console.log('enrollForm.value:', this.enrollForm.value); // excludes disabled controls
    console.log('enrollForm.getRawValue():', this.enrollForm.getRawValue()); // includes all controls
  }

  // Required by CanDeactivate guard
  isDirty(): boolean {
    return this.enrollForm.dirty;
  }
}
