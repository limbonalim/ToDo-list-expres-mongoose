import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../app/store.ts';
import { deleteTask, getTasks, logIn, postTask, putTask, signIn } from './taskThunks.ts';
import type { ITask } from '../types';
import { IUser } from '../types';


interface ITasksSlice {
	isShowModal: boolean;
	isShowTaskModal: boolean;
	tasks: ITask[];
	editTask: ITask | null;
	user: IUser | null,
	error: string;
	isError: boolean;
	isLoading: boolean;
	isCreateOrEdit: boolean;
}

const initialState: ITasksSlice = {
	isShowModal: false,
	isShowTaskModal: false,
	tasks: [],
	editTask: null,
	user: null,
	error: '',
	isError: false,
	isLoading: false,
	isCreateOrEdit: false
}

const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		openModal: (state) => {
			state.isShowModal = true;
		},
		closeModal: (state) => {
			state.isShowModal = false;
		},
		openTaskModal: (state) => {
			state.isShowTaskModal = true;
		},
		closeTaskModal: (state) => {
			state.isShowTaskModal = false;
		},
		setEditTask: (state, {payload: task}: PayloadAction<ITask>) => {
			state.editTask = task;
		},
		setDeletingTask: (state, {payload: id}: PayloadAction<string>) => {
			const index = state.tasks.findIndex((item) => item._id === id);
			if (index >= 0) {
				state.tasks[index].isDeleting = true;
			}
		},
	},
	extraReducers: builder => {
		builder.addCase(signIn.pending, (state) => {

		}).addCase(signIn.fulfilled, (state, {payload: user}) => {
			localStorage.setItem('token', user.token);
			state.user = user;
		}).addCase(signIn.rejected, (state, {error}) => {
			console.log(error);
		});

		builder.addCase(logIn.pending, (state) => {

		}).addCase(logIn.fulfilled, (state, {payload: user}) => {
			localStorage.setItem('token', user.token);
			state.user = user;
		}).addCase(logIn.rejected, (state, {error}) => {
			console.log(error);
		});

		builder.addCase(getTasks.pending, (state) => {
			state.tasks = [];
			state.isError = false;
			state.error = '';
			state.isLoading = true;
		}).addCase(getTasks.fulfilled, (state, {payload: userTasks}) => {
			state.tasks = userTasks;
			state.isLoading = false;
		}).addCase(getTasks.rejected, (state, {error}) => {
			state.tasks = [];
			state.isLoading = false;
			state.isError = true;
			if (error.message === 'Request failed with status code 404') {
				state.error = '404! Not Found'
			} else {
				state.error = error.message? error.message : '';
			}
		});

		builder.addCase(postTask.pending, (state) => {
			state.isError = false;
			state.error = '';
			state.isCreateOrEdit = true;
		}).addCase(postTask.fulfilled, (state) => {
			state.isCreateOrEdit = false;
		}).addCase(postTask.rejected, (state, {error}) => {
			state.isError = true;
			state.error = error.message? error.message : '';
			state.isCreateOrEdit = false;
		});

		builder.addCase(putTask.pending, (state) => {
			state.isError = false;
			state.error = '';
			state.editTask = null;
			state.isCreateOrEdit = true;
		}).addCase(putTask.fulfilled, (state) => {
			state.isCreateOrEdit = false;
		}).addCase(putTask.rejected, (state, {error}) => {
			state.isError = true;
			state.error = error.message? error.message : '';
			state.isCreateOrEdit = false;
		});

		builder.addCase(deleteTask.pending, (state) => {
			state.isError = false;
			state.error = '';
		}).addCase(deleteTask.rejected, (state, {error}) => {
			state.isError = true;
			state.error = error.message? error.message : '';
		});
	}
})

export const selectIsShowModal = (state: RootState) => state.task.isShowModal;
export const selectIsShowTaskModal = (state: RootState) => state.task.isShowTaskModal;
export const selectTasks = (state: RootState) => state.task.tasks;
export const selectEditTask = (state: RootState) => state.task.editTask;
export const selectUser = (state: RootState) => state.task.user;
export const selectisLoading = (state: RootState) => state.task.isLoading;
export const selectIsError = (state: RootState) => state.task.isError;
export const selectError = (state: RootState) => state.task.error;
export const selectIsCreateOrEdit = (state: RootState) => state.task.isCreateOrEdit;

export const {
	openModal,
	closeModal,
	openTaskModal,
	closeTaskModal,
	setEditTask,
	setDeletingTask} = tasksSlice.actions

export const tasksReducer = tasksSlice.reducer;