import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth.interceptor';
import { errorHandlerInterceptor } from './interceptors/error-handler.interceptor';
import { loadingInterceptor } from './interceptors/loading.interceptor';
import { courseReducer } from './store/course/course.reducer';
import { enrollmentReducer } from './store/enrollment/enrollment.reducer';
import { CourseEffects } from './store/course/course.effects';

// HANDS-ON 1: app.config.ts is the standalone replacement for app.module.ts.
// It bootstraps providers instead of an NgModule (Angular 17+ default, continued in v20).
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // HANDS-ON 8: HttpClient + interceptors (auth token, global error handling, loading spinner)
    provideHttpClient(
      withInterceptors([authInterceptor, errorHandlerInterceptor, loadingInterceptor])
    ),
    // HANDS-ON 9: NgRx store + effects + devtools
    provideStore({ course: courseReducer, enrollment: enrollmentReducer }),
    provideEffects([CourseEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
  ],
};
