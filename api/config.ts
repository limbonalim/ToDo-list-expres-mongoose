interface Config {
	mongoose: string;
}

const config: Config = {
	mongoose: 'mongodb://localhost/todolist',
};

export default config;
