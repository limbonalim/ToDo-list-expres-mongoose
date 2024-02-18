import React, { memo } from 'react';
import { Button, Grid, Typography } from '@mui/material';

import { statusProperty } from '../../constants';
import { useAppDispatch } from '../../app/hooks.ts';
import { openTaskModal, setDeletingTask, setEditTask } from '../../store/taskSlice.ts';
import { deleteTask, getTasks } from '../../store/taskThunks.ts';
import type { ITask } from '../../types';

const memoTask: React.FC<ITask> = memo(function Task({_id, title, description, status, isDeleting}) {
	const dispatch = useAppDispatch();
	const token = localStorage.getItem('token');
	const statusIndex = statusProperty.findIndex((item) => item.value === status);

	const handleEdit = async () => {
		dispatch(setEditTask({
			_id,
			title,
			description,
			status,
			isDeleting
		}));
		dispatch(openTaskModal());
	};
	const handleDelete = async () => {
		if (token) {
			dispatch(setDeletingTask(_id));
			await dispatch(deleteTask({
				id: _id,
				token
			}));
			await dispatch(getTasks(token));
		}
	};

	return (
		<Grid container item justifyContent='space-between' direction='row' sx={{border: '1px solid black', borderRadius: 2, padding: 2}}>
			<Grid container item direction='column' sx={{width: '50%'}}>
				<Grid><Typography variant='h4'>{title}</Typography></Grid>
				<Grid><Typography>{description}</Typography></Grid>
			</Grid>
			<Grid item>
				<Typography
					color={statusIndex >= 0 ? statusProperty[statusIndex].color : 'black'}
				>
					{statusIndex >= 0 ? statusProperty[statusIndex].title : 'unknown'}
				</Typography>
			</Grid>
			<Grid item>
				<Button onClick={handleEdit} variant="outlined" color="success">Change</Button>
				<Button onClick={handleDelete} variant="outlined" color="error" disabled={isDeleting}>Delete</Button>
			</Grid>
		</Grid>
	);
});

export default memoTask;