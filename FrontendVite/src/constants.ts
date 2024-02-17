export const BASE_URL = 'http://localhost:8000';

export enum Status {
	new = 'new',
	inProgress = 'in_progress',
	complete = 'complete',
}

export const statusProperty = [
	{
		value: Status.new,
		title: 'New',
		color: 'blue'
	},
	{
		value: Status.inProgress,
		title: 'In progress',
		color: 'green'
	},
	{
		value: Status.complete,
		title: 'Complete',
		color: 'brown'
	}
];

