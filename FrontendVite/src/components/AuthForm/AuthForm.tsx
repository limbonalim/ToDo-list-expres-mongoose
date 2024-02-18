import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { FormControlLabel, IconButton, Switch } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { closeModal, openModal, selectIsAuth, selectIsShowModal } from '../../store/taskSlice.ts';
import { logIn, signIn } from '../../store/taskThunks.ts';
import type { IUserForm } from '../../types';

const AuthForm = () => {
	const open = useAppSelector(selectIsShowModal);
	const dispatch = useAppDispatch();
	const [user, setUser] = useState<IUserForm>({
		username: '',
		password: ''
	});
	const [title, setTitle] = useState<string>('Login');
	const [isLogin, setIsLogin] = useState<boolean>(true);
	const isLoading = useAppSelector(selectIsAuth);

	const handleClickOpen = () => {
		dispatch(openModal());
	};

	const handleClose = () => {
		dispatch(closeModal());
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {name, value} = e.target;

		setUser(prev => (
			{...prev,
				[name]: value
			}
		));
	};

	const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {checked} = e.target;
		setIsLogin(checked);
		if (checked) {
			return setTitle('Login');
		} else {
			return setTitle('Sign in');
		}
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault();
			if (isLogin) {
				await dispatch(logIn(user));
			} else {
				await dispatch(signIn(user));
			}
			handleClose();
	};

	return (
		<React.Fragment>
			<IconButton color="primary" onClick={handleClickOpen}>
				<AccountCircleIcon/>
			</IconButton>
			<Dialog
				open={open}
				onClose={handleClose}
				PaperProps={{
					component: 'form',
					onSubmit: handleSubmit
				}}
			>
				<DialogTitle>{title}</DialogTitle>
				<DialogContent>
					<DialogContentText>
						<FormControlLabel control={<Switch defaultChecked onChange={changeTitle} value={isLogin}/>} label="Login" />
					</DialogContentText>
					<TextField
						autoFocus
						required
						onChange={onChange}
						value={user.username}
						margin="dense"
						id="username"
						name="username"
						label="User name"
						fullWidth
						variant="standard"
					/>
					<TextField
						required
						onChange={onChange}
						value={user.password}
						margin="dense"
						id="password"
						name="password"
						label="Password"
						fullWidth
						variant="standard"
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button type="submit" disabled={isLoading}>{title}</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
};

export default AuthForm;