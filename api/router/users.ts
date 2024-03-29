import { Router } from 'express';
import mongoose, { mongo } from 'mongoose';
import User from '../models/usersSchema';

const usersRouter = Router();

usersRouter.post('/', async (req, res, next) => {
	try {
		if (!req.body.username || !req.body.password) {
			return res
				.status(400)
				.send({ error: 'username and password should be in request' });
		}
		const user = new User({
			username: req.body.username,
			password: req.body.password,
		});

		user.generateToken();
		await user.save();
		return res.status(201).send(user);
	} catch (e) {
		if (e instanceof mongoose.Error.ValidationError) {
			return res.status(422).send(e);
		}
		if (e instanceof mongo.MongoServerError && e.code === 11000) {
			return res
				.status(422)
				.send({ error: 'User with this username is already have' });
		}
		next(e);
	}
});

usersRouter.post('/sessions', async (req, res, next) => {
	try {
		if (!req.body.username || !req.body.password) {
			return res
				.status(400)
				.send({ error: 'username and password should be in request' });
		}

		const user = await User.findOne({ username: req.body.username });

		if (!user) {
			return res
				.status(422)
				.send({ error: 'Username and/or password not found!' });
		}
		const isMatch = await user.checkPassword(req.body.password);

		if (!isMatch) {
			return res
				.status(422)
				.send({ error: 'Username and/or password not found!' });
		}

		user.generateToken();
		await user.save();

		return res.send({ message: 'username and password are correct', user });
	} catch (e) {
		next(e);
	}
});

export default usersRouter;
