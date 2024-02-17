import { configureStore } from '@reduxjs/toolkit';
import { tasksReducer } from '../store/taskSlice.ts';

export const store = configureStore({
	reducer: {
		task: tasksReducer
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;