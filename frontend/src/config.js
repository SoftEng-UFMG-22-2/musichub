// Here we setup the Url to access

const config = {
	backendUrl:
		process.env.NODE_ENV === 'development'
			? 'http://localhost:8000'
			: 'PRODUCTION_URL_HERE',
	repoUrl: 'https://github.com/SoftEng-UFMG-22-2/musichub',
};

export default config;
