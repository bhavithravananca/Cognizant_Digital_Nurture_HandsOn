import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CourseService } from './course.service';
import { Course } from '../models/course.model';

// HANDS-ON 10, Task 2: service testing with HttpClientTestingModule / HttpTestingController
describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  const mockCourses: Course[] = [
    { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'Operating Systems', code: 'CS102', credits: 3, gradeStatus: 'pending' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CourseService],
    });
    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // asserts no outstanding/unexpected HTTP requests
  });

  it('should fetch courses via GET', () => {
    service.getCourses().subscribe((courses) => {
      expect(courses.length).toBe(2);
    });

    const req = httpMock.expectOne('http://localhost:3000/courses');
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
  });

  it('should surface a friendly error message on server failure', (done) => {
    service.getCourses().subscribe({
      error: (err) => {
        expect(err.message).toContain('Failed to load courses');
        done();
      },
    });

    // account for retry(2): 3 total requests before catchError fires
    for (let i = 0; i < 3; i++) {
      httpMock.expectOne('http://localhost:3000/courses').flush('Server error', {
        status: 500,
        statusText: 'Internal Server Error',
      });
    }
  });
});
