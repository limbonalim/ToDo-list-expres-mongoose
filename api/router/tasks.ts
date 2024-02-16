import { Router } from 'express';
import mongoose, { Types } from 'mongoose';
import auth, { RequestWithUser } from '../middleware/auth';
import Tasks, { Status } from '../models/tasksSchema';

const tasksRouter = Router();

tasksRouter.post('/', auth, async (req: RequestWithUser, res, next) => {
	try {
		const user = req.user;
		if (!req.body.title) {
			return res.status(400).send({ error: 'title should be in request' });
		}
		const task = new Tasks({
			user: user?._id,
			title: req.body.title,
			description: req.body.description ? req.body.description : '',
			status: req.body.status,
		});

		await task.save();
		return res.status(201).send(task);
	} catch (e) {
		if (e instanceof mongoose.Error.ValidationError) {
			return res.status(422).send(e);
		}

		next(e);
	}
});

tasksRouter.get('/', auth, async (req: RequestWithUser, res, next) => {
	try {
		const user = req.user;
		const tasks = await Tasks.find({ user: user?._id });

		if (!tasks[0]) {
			return res.status(404).send({ error: 'not found!' });
		}

		return res.send(tasks);
	} catch (e) {
		next(e);
	}
});

tasksRouter.put('/:id', auth, async (req: RequestWithUser, res, next) => {
	try {
		let taskId: Types.ObjectId;
		try {
			taskId = new Types.ObjectId(req.params.id);
		} catch {
			return res.status(404).send({ error: 'Wrong ObjectId!' });
		}
		const task = await Tasks.findById(taskId);

		if (!task) {
			return res.status(404).send({ error: 'not found' });
		}

		const title = req.body.title;
		const description = req.body.description;
		const status: Status = req.body.status;
		switch (status) {
			case Status.complete:
				break;
			case Status.inProgress:
				break;
			case Status.new:
				break;
			default:
				return res
					.status(400)
					.send({
						error: `Status was be The status must be one of the following values: ${Status.new}, ${Status.inProgress}, ${Status.complete}`,
					});
		}

		const putData = {
			title: title,
			description: description,
			status: status,
		};

		const newTask = await Tasks.findOneAndUpdate({ _id: taskId }, putData, {
			new: true,
		});
		return res.send(newTask);
	} catch (e) {
		next(e);
	}
});

tasksRouter.delete('/:id', auth, async (req: RequestWithUser, res, next) => {
	try {
		let taskId: Types.ObjectId;
		try {
			taskId = new Types.ObjectId(req.params.id);
		} catch {
			return res.status(404).send({ error: 'Wrong ObjectId!' });
		}

		const user = req.user;
		const task = await Tasks.find({ user: user?._id, _id: taskId });

		if (!task[0]) {
			return res.status(404).send({ error: 'not found' });
		}

		await Tasks.findByIdAndDelete(taskId);

		return res.send({ success: true });
	} catch (e) {
		next(e);
	}
});

export default tasksRouter;
