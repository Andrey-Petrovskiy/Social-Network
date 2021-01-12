class DI {
  static container = {};
  static config;

  static set(name, service) {
    DI.container[name] = service;
  }

  static get(name) {
    return DI.container[name];
  }

  static setConfig(config) {
    DI.config = config;
  }

  static getConfig() {
    return DI.config;
  }
}

module.exports = DI;
