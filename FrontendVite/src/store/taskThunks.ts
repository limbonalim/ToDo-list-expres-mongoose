import { createAsyncThunk } from '@reduxjs/toolkit';

import axiosApi from '../axiosApi.ts';
import type { ITask, IUser, IQueryTask, IQueryPutTask, IQueryTaskDelete, IUserForm } from '../types';

export const signIn = createAsyncThunk<IUser, IUserForm>(
	'tasks/signIn',
	async (user) => {
		const response = await axiosApi.post('/users', user);

		return response.data;
	}
);

export const logIn = createAsyncThunk<IUser, IUserForm>(
	'tasks/logIn',
	async (user) => {
		const response = await axiosApi.post('/users/sessions', user);
		return response.data.user;
	}
);

export const getTasks = createAsyncThunk<ITask[], string>(
	'tasks/getTasks',
	async (token) => {
		const response = await axiosApi.get<ITask[]>('/tasks', {headers : {'Authorization': `Barer ${token}`}});

		return response.data;
	}
);

export const postTask = createAsyncThunk<void, IQueryTask>(
	'tasks/postTask',
	async ({task, token}) => {
		await axiosApi.post('/tasks', task, {headers : {'Authorization': `Barer ${token}`}});
	}
);

export const putTask = createAsyncThunk<void, IQueryPutTask>(
	'tasks/putTask',
	async ({id, task, token}) => {
		await axiosApi.put(`/tasks/${id}`, task, {headers : {'Authorization': `Barer ${token}`}});
	}
)

export const deleteTask = createAsyncThunk<void, IQueryTaskDelete>(
	'tasks/deleteTask',
	async ({ id, token }) => {
		await axiosApi.delete(`tasks/${id}`, {headers : {'Authorization': `Barer ${token}`}});
	}
);