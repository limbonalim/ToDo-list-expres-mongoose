import { Schema, model, Types } from 'mongoose';
import User from './usersSchema';
import { ITaskFields, ITaskModel } from '../types';

export enum Status {
	new = 'new',
	inProgress = 'in_progress',
	complete = 'complete',
}

const tasksSchema = new Schema<ITaskFields, ITaskModel, unknown>({
	user: {
		type: Types.ObjectId,
		required: true,
		ref: 'users',
		validate: {
			validator: async (value: Types.ObjectId) => {
				const user = await User.findById(value);
				return Boolean(user);
			},
			message: 'User is not found',
		},
	},
	title: {
		type: String,
		required: true,
	},
	description: String,
	status: {
		type: String,
		enum: Status,
		default: Status.new,
	},
});

const Tasks = model<ITaskFields, ITaskModel>('tasks', tasksSchema);
export default Tasks;
