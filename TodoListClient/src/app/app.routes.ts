import { Routes } from '@angular/router';
import { LoginComponent } from './components/login-component/login-component';
import { SignupComponent } from './components/signup-component/signup-component';
import { TodoListComponent } from './components/todo-list-component/todo-list-component';
import { TodoFormComponent } from './components/todo-form-component/todo-form-component';

export const routes: Routes = [
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "signup",
        component: SignupComponent
    },
    {
        path:"tasks",
        component: TodoListComponent
    },
    {
        path:"add",
        component: TodoFormComponent,
    },
    {
        path:"edit/:id",
        component:TodoFormComponent
    }
];
