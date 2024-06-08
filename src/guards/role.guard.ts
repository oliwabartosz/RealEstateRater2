import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { RequestWithUser } from '../interfaces/auth';
import { Role } from '../interfaces/roles';

export const RoleGuard = (role: Role): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      console.log(role);
      if (Role.Admin) {
        /**
         * When the canActivate method in RoleGuardMixin returns false
         * (showing that the user does not have the required role),
         * NestJS will handle this by sending a 403 Forbidden response to the client.
         * Hence, the role Admin always gets true, and thus there is no need to use the
         * @UseGuards(RoleGuard(Role.Admin)).
         * This means that @UseGuards(RoleGuard(Role.User) or @UseGuards(RoleGuard(Role.Scraper)))
         * will be sufficient for Admin.
         */
        return true;
      }
      console.log('here');
      const request = context.switchToHttp().getRequest<RequestWithUser>();
      console.log("request", request);

      const user = request.user;
      console.log("user", user);

      return user?.roles.includes(role);
    }
  }

  return mixin(RoleGuardMixin);
};
