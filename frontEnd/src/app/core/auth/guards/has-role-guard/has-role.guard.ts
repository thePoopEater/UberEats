import { Inject, inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { AuthService } from "../../../services/auth-service/auth.service";

export const hasRoleGuard: CanActivateFn = (route, state) => {
  let authService: AuthService = inject(AuthService);

  let role_expected = route.data["role"];

  if (authService.getRole() == role_expected) {
    return true;
  } else {
    console.log("No puedes entrar");
    return false;
  }
};
