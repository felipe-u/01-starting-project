import { CanMatchFn, RedirectCommand, Router, Routes } from "@angular/router";

import { routes as UserRoutes } from "./users/users.routes";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { resolveTitle, resolveUserName, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { inject } from "@angular/core";

const dummyCanMatch: CanMatchFn = (route, segments) => {
    const router = inject(Router);
    const shouldGetAccess = Math.random();
    if (shouldGetAccess) {
        return true;
    }
    return new RedirectCommand(router.parseUrl('/unauthoried'));
};

export const routes: Routes = [
    {
        path: '',
        component: NoTaskComponent,
        // redirectTo: '/users/u1',
        // pathMatch: 'full'
        title: 'No tasks selected'
    },
    {
        path: 'users/:userId',
        component: UserTasksComponent,
        children: UserRoutes,
        canMatch: [dummyCanMatch],
        data: {
            message: 'Hello!'
        },
        resolve: {
            userName: resolveUserName
        },
        title: resolveTitle
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];