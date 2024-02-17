import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import AddIcon from '@mui/icons-material/Add';
import DialogTitle from '@mui/material/DialogTitle';
import {
	FormControl,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
} from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import {
	closeTaskModal,
	openTaskModal, selectEditTask,
	selectIsShowTaskModal,
} from '../../store/taskSlice.ts';
import { getTasks, postTask, putTask } from '../../store/taskThunks.ts';
import { statusProperty } from '../../constants.ts';
import type { IQueryPutTask, IQueryTask, ITaskForm } from '../../types';




const TaskForm = () => {
	const editTask = useAppSelector(selectEditTask);
	const open = useAppSelector(selectIsShowTaskModal);
	const dispatch = useAppDispatch();
	const [task, setTask] = useState<ITaskForm>({
		title: '',
		description: '',
		status: ''
	});

	useEffect(() => {
		if (editTask) {
			setTask({
				title: editTask.title,
				description: editTask.description ? editTask.description : '',
				status: editTask.status
			});
		}
	}, [editTask]);

	const token = localStorage.getItem('token');

	const selectItems = statusProperty.map((item) => (
		<MenuItem key={item.value} value={item.value}>{item.title}</MenuItem>
	))

	const handleClickOpen = () => {
		dispatch(openTaskModal());
	};

	const handleClose = () => {
		dispatch(closeTaskModal());
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {name, value} = e.target;

		setTask(prev => (
			{...prev,
				[name]: value
			}
		));
	};

	const changeStatus = (e: SelectChangeEvent<string>) => {
		const { value} = e.target;

		setTask(prev => (
			{...prev,
				status: value
			}
		));
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (token) {
			const data: IQueryTask =  {
				token,
				task
			}
			if (editTask) {
				const putData: IQueryPutTask =  {
					id: editTask._id,
					...data
				}
				await dispatch(putTask(putData));
				await dispatch(getTasks(token));
			} else {
				await dispatch(postTask(data));
				await dispatch(getTasks(token));
			}

		}

		handleClose();
	};

	return (
		<React.Fragment>
			<IconButton color="primary" onClick={handleClickOpen}>
				<AddIcon/>
			</IconButton>
			<Dialog
				open={open}
				onClose={handleClose}
				PaperProps={{
					component: 'form',
					onSubmit: handleSubmit
				}}
			>
				<DialogTitle>Title</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						required
						onChange={onChange}
						value={task.title}
						margin="dense"
						id="title"
						name="title"
						label="Title"
						fullWidth
						variant="standard"
					/>
					<TextField
						onChange={onChange}
						value={task.description}
						margin="dense"
						id="description"
						name="description"
						label="Description"
						fullWidth
						variant="standard"
						multiline
						rows={3}
						sx={{mb: 2}}
					/>
					<FormControl fullWidth>
						<InputLabel id="select">Status</InputLabel>
						<Select
							labelId="select"
							id="select"
							required
							label="Status"
							name="status"
							defaultValue=''
							onChange={changeStatus}
							value={task.status}
						>
							{selectItems}
						</Select>
					</FormControl>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button type="submit">Add</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
};

export default TaskForm;