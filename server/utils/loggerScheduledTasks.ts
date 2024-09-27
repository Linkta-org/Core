import cron from 'node-cron';
import log4js from 'log4js';
import createLogsController from '@controllers/logsController';
import createLogsService from '@/services/logsService';

const logger = log4js.getLogger('[LOGGER TASKS]');
const logsService = createLogsService();
const { uploadLogs, evictLogs } = createLogsController(logsService);

// runs daily at midnight + 5 minutes server time
const rollLogs = cron.schedule('0 5 * * *', async () => {
  logger.info('Rolling logs...');
});

// runs daily at midnight + 30 minutes server time
const uploadLogsTask = cron.schedule('0 10 * * *', async () => {
  logger.info('Uploading logs...');
  void uploadLogs();
});

// runs daily at midnight + 1 hour server time
const evictLogsTask = cron.schedule('0 15 * * *', async () => {
  logger.info('Evicting logs...');
  void evictLogs();
});

const startAllScheduledTasks = () => {
  rollLogs.start();
  uploadLogsTask.start();
  evictLogsTask.start();
};

export default startAllScheduledTasks;