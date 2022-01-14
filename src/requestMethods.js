import axios from 'axios';
import { API } from './config';

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZGNiZmRjY2MyMWFjZmQ3OGNmMWZiMiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MjEyOTIxNywiZXhwIjoxNjQyMjE1NjE3fQ.0DP70csQZzfAaUztWncCSg2per7Nd_Sq7RCPjV5j8uc';

export const publicRequest = axios.create({
    baseURL: API,
});

export const userRequest = axios.create({
    baseURL: API,
    header: { token: `Bearer ${TOKEN}` },
});