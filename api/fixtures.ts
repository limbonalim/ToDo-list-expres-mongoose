import mongoose from 'mongoose';
import config from './config';
import User from './models/usersSchema';
import Tasks, { Status } from './models/tasksSchema';

const dropCollection = async (
	db: mongoose.Connection,
	collectionName: string,
) => {
	try {
		await db.dropCollection(collectionName);
	} catch (e) {
		console.log(`Collection ${collectionName} was missing, skipping drop`);
	}
};

const run = async () => {
	await mongoose.connect(config.mongoose);
	const db = mongoose.connection;

	const collections = ['users', 'tasks'];

	for (const collectionName of collections) {
		await dropCollection(db, collectionName);
	}

	const [admin, user] = await User.create(
		{
			username: 'admin',
			password: '1fqdrzg2admin',
			token: 'Esb25x3c-ce6f-4aE6-9919-c21848bc9e9e',
		},
		{
			username: 'user',
			password: 'user1fqdrzg2',
			token: 'ddb2dc3c-ce6f-4af6-9919-c21848bc9e8e',
		},
	);

	await Tasks.create(
		{
			user: admin,
			title: 'Go to shop',
			description: 'Buy something in shop',
			status: Status.inProgress,
		},
		{
			user: admin,
			title: 'cook food',
			description: '',
			status: Status.new,
		},
		{
			user: user,
			title: 'Fix car',
			description: 'Fix engine in my car',
			status: Status.complete,
		},
		{
			user: user,
			title: 'Read book',
			description: '',
			status: Status.new,
		},
	);

	await db.close();
};

void run();
