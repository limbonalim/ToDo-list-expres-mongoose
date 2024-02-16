import express, { json } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import config from './config';
import usersRouter from './router/users';
import tasksRouter from './router/tasks';

const app = express();
const port = 8000;

app.use(json());
app.use(cors());

app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);

const run = async () => {
	await mongoose.connect(config.mongoose);

	app.listen(port, () => {
		console.log(`Server started on ${port} port!`);
	});

	process.on('exit', () => {
		mongoose.disconnect();
	});
};

void run();
