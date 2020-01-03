import pino from 'pino';

class Logger {
  static info = (code, message) => {
    const log = pino();
    const child = log.child({
      code
    });

    child.info(message);
  };
}

export default Logger;
