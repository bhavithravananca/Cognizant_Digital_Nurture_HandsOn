# Student Course Portal — Digital Nurture 5.0 (Angular v20)

This is a single Angular project implementing **all 10 hands-on exercises** from the
`Angular_HandsOn.pdf` exercise book. Every hands-on builds on the last, exactly as specified.

## 1. Setup

```bash
npm install -g @angular/cli
cd student-course-portal
npm install
npm install -g json-server

# Terminal 1 — mock backend (used from Hands-On 8 onward)
json-server --watch db.json --port 3000
# or: npm run api

# Terminal 2 — the app
ng serve
# open http://localhost:4200
```

Run unit tests (Hands-On 10):
```bash
ng test
ng test --code-coverage
```

## 2. Where each Hands-On lives

| Hands-On | Topic | Key files |
|---|---|---|
| 1 | Setup, structure, first components | `angular.json`, `src/app/app.config.ts`, `components/header`, `pages/home` |
| 2 | Binding, lifecycle hooks, @Input/@Output | `pages/home/home.component.ts`, `components/course-card/course-card.component.ts` |
| 3 | Directives & pipes | `directives/highlight.directive.ts`, `pipes/credit-label.pipe.ts`, `pages/course-list` |
| 4 | Template-driven forms | `pages/enrollment-form/*` |
| 5 | Reactive forms | `pages/reactive-enrollment-form/*` |
| 6 | Services & DI | `services/course.service.ts`, `services/enrollment.service.ts`, `components/notification` |
| 7 | Routing, guards, lazy loading | `app.routes.ts`, `guards/*`, `features/enrollment/enrollment.routes.ts` |
| 8 | HTTP client, RxJS, interceptors | `services/course.service.ts`, `interceptors/*` |
| 9 | NgRx state management | `store/course/*`, `store/enrollment/*` |
| 10 | Unit testing | `*.spec.ts` files (course-card, course.service, course-list) |

## 3. Notes

- Built with Angular's **standalone component** API (no NgModules), the Angular 17+/20 default.
- `db.json` seeds JSON Server with sample `courses`, `students`, `enrollments` for Hands-On 8+.
- `AuthService.isLoggedIn` is hardcoded `true` — set it to `false` to see `authGuard` redirect `/profile` and `/enroll` to home.
- The `/enroll` route (both forms) is lazy-loaded — check the Network tab on first visiting it to see the separate JS chunk (Hands-On 7, Task 2).
- Redux DevTools browser extension will show the NgRx action stream (`[Course] Load Courses` → `...Success`) when you open `/courses`.
