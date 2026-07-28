import { CanDeactivateFn } from '@angular/router';

export interface CanComponentDeactivate {
  isDirty(): boolean;
}

// HANDS-ON 7, Task 2: CanDeactivate — prevents losing unsaved form data on navigation
export const unsavedChangesGuard: CanDeactivateFn<CanComponentDeactivate> = (component) => {
  if (component.isDirty()) {
    return window.confirm('You have unsaved changes. Leave?');
  }
  return true;
};
