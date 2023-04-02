import { Router } from '@angular/router';
import { inject } from '@angular/core';
/**
 * Auth Guards
 */
export const canActivateGuard = () => {
    const router = inject(Router);

    return true;
}
