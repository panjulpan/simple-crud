import mongoose from 'mongoose';
import Config from '../utils/config';

const DB = async () => {
  const host = Config.getEnv('MONGO_URI');

  try {
    await mongoose.connect(host, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
  } catch (e) {
    process.exit(1);
  }
};

export default DB();
