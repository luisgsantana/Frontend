import axios from 'axios';

// const api = axios.create({baseURL: 'localhost:3000'})

const apiServer = `http://${(process.env.REACT_APP_API_URL) ? process.env.REACT_APP_API_URL : 'localhost'}`;
const port = (process.env.REACT_APP_API_PORT) ? process.env.REACT_APP_API_PORT : '3000';

console.log(`BASE_URL ${apiServer}:${port}`);

const client = axios.create({
  baseURL: `${apiServer}:${port}`,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
});

const urlFiles = `${apiServer}:${port}/files`;

export { client, urlFiles };
