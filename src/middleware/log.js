import chalk from 'chalk';
import moment from 'moment';
import { v4 } from 'uuid';

const log = console.log;

export default async function (req, res, next) {
  const id = v4();
  console.time(id);

  const now = `[${chalk.green(moment().format('HH:mm:ss:SSS'))}]`;
  const method = chalk.magenta(req.method);
  const route = chalk.blue(req.url);

  next();

  res.on('finish', () => {
    const { statusCode } = res;
    const code = chalk.red(statusCode);

    log(`${now} ${method} request received on ${route} with code ${code}`);
    console.timeEnd(id);
    log(`\n`);
  });
}
