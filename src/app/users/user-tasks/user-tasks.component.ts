import { Component, inject, input } from '@angular/core';
import { UsersService } from '../users.service';
import {  ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterOutlet, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink]
})
export class UserTasksComponent {
  // userId = input.required<string>();
  userName = input.required<string>();
  message = input.required<string>();
}

export const resolveUserName: ResolveFn<string> = (
  activedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const usersService = inject(UsersService);
  const userName = usersService.users.find(
    (u) => u.id === activedRoute.paramMap.get('userId'))?.name || '';
  return userName;
}