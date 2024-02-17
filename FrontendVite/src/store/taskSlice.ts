import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../app/store.ts';
import { deleteTask, getTasks, logIn, signIn } from './taskThunks.ts';
import type { ITask } from '../types';
import { IUser } from '../types';


interface ITasksSlice {
	isShowModal: boolean;
	isShowTaskModal: boolean;
	tasks: ITask[];
	editTask: ITask | null;
	user: IUser | null
}

const initialState: ITasksSlice = {
	isShowModal: false,
	isShowTaskModal: false,
	tasks: [],
	editTask: null,
	user: null
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
		}
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
		}).addCase(getTasks.fulfilled, (state, {payload: userTasks}) => {
			state.tasks = userTasks;
		}).addCase(getTasks.rejected, (state, {error}) => {

		});

		builder.addCase(deleteTask.pending, (state) => {

		}).addCase(deleteTask.fulfilled, (state) => {

		}).addCase(deleteTask.rejected, (state, {error}) => {
			console.log(error);
		});
	}
})

export const selectIsShowModal = (state: RootState) => state.task.isShowModal;
export const selectIsShowTaskModal = (state: RootState) => state.task.isShowTaskModal;
export const selectTasks = (state: RootState) => state.task.tasks;
export const selectEditTask = (state: RootState) => state.task.editTask;
export const selectUser = (state: RootState) => state.task.user;

export const {
	openModal,
	closeModal,
	openTaskModal,
	closeTaskModal,
	setEditTask} = tasksSlice.actions

export const tasksReducer = tasksSlice.reducer;