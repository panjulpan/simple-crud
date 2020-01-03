class Config {
  static getEnv(key) {
    const value = process.env[key];

    return value;
  }
}

export default Config;
