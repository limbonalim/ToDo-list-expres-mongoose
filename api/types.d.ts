import { Model, Schema } from 'mongoose';
import { Status } from './models/tasksSchema';

export interface IUserFields {
	username: string;
	password: string;
	token: string;
}

export interface IUserMethods {
	checkPassword(password: string): Promise<boolean>;
	generateToken(): void;
}

export type IUserModel = Model<IUserFields, unknown, IUserMethods>;

export interface ITaskFields {
	user: Schema.Types.ObjectId;
	title: string;
	description?: string;
	status: Status;
}

export type ITaskModel = Model<IUserFields, unknown, unknown>;
