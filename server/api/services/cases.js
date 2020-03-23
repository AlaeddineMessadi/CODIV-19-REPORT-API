import logger from '../../common/logger';
import db from './cases.db.service';

class CasesService {
  all() {
    logger.info(`${this.constructor.name}.all()`);
    return db.all();
  }

  brief() {
    logger.info(`${this.constructor.name}.brief()`);
    return db.brief();
  }

  latest(iso, onlyCountries) {
    logger.info(`${this.constructor.name}.latest()`);
    return db.latest(iso, onlyCountries);
  }

  timeseries(iso, onlyCountries) {
    logger.info(`${this.constructor.name}.timeseries()`);
    return db.timeseries(iso, onlyCountries);
  }

  byId(id) {
    logger.info(`${this.constructor.name}.byId(${id})`);
    return db.byId(id);
  }

  selfUpdate(secret) {
    if (secret !== process.env.SESSION_SECRET) {
      return Promise.reject('Wrong secret');
    }
    return db.selfUpdate();
  }
}

export default new CasesService();
