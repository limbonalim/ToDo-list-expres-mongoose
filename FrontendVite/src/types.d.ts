import { Status } from './components/Task/Task.tsx';
import { ITaskForm } from './components/TaskForm/TaskForm.tsx';

export interface IApiTask {
	_id: string;
	title: string;
	description?: string;
	status: Status;
}

export interface ITask extends IApiTask {
	isDeleting: boolean
}

export interface IUser {
	token: string
	username: string
}

export interface IQueryTask {
	token: string;
	task: ITaskForm;
}

export interface IQueryPutTask extends IQueryTask{
	id: string;
}

export interface IQueryTaskDelete {
	id: string;
	token: string;
}

export interface IUserForm {
	username: string,
	password: string
}

export interface ITaskForm {
	title: string;
	description: string;
	status: string;
}