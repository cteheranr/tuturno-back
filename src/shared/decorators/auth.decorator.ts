import { applyDecorators, UseGuards } from "@nestjs/common";
import { Role } from "../enums/roles.enum";
import { AuthGuard } from "../guard/auth/auth.guard";
import { Roles } from "./roles.decorator";
import { RolesGuard } from "../guard/roles/roles.guard";

export function Auth(...roles: Role[]) {
    return applyDecorators(
      Roles(...roles),
      UseGuards(AuthGuard, RolesGuard),
    );
  }