import cors from 'cors'
import YAML from 'yamljs';
import express from 'express';
import swaggerUI from 'swagger-ui-express';
import Logger from './utils/logger';
import Config from './utils/config';
import UserController from './controllers/UserController';

require('dotenv').config();
require('./db');

const app = express();

app.use(cors());

app.use(express.json({ extended: false }));

app.get('/', UserController.getExample);
app.get('/users', UserController.getUsers);
app.post('/users', UserController.postUser);
app.get('/users/:nik', UserController.getUserNik);
app.patch('/users/:nik', UserController.editUser);
app.delete('/users/:nik', UserController.deleteUser);

const swaggerDocument = YAML.load('./swagger.yml');
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

const PORT = Config.getEnv('APP_PORT');
app.listen(PORT, () => Logger.info('200', 'SERVER IS RUNNING'));
