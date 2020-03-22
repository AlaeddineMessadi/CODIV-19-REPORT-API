import { parseCsvAll } from '../../utils/csvTools';
import { filterByCode } from '../../utils/helpers';
import schedule from 'node-schedule';
/**
 * We load data from csv to the database when Initializing
 * https://github.com/CSSEGISandData/COVID-19
 */
class CasesDatabase {
  constructor() {
    this._data = {};
    this._lastUpdate = '';

    /** Initial update */
    this.selfUpdate();

    /** Execute a cron job every 2 hours  */
    schedule.scheduleJob('0 */2 * * *', () => {
      this.selfUpdate();
    });
  }

  setData(data) {
    this._data = data;
  }

  all() {
    return Promise.resolve(this._data);
  }

  brief() {
    return Promise.resolve(this._data.brief);
  }

  latest(iso, onlyCountries) {
    let latest = onlyCountries
      ? this._data.latestOnlyCountries
      : this._data.latest;

    if (iso) latest = filterByCode(latest, iso);

    return Promise.resolve({ count: latest.length, data: latest });
  }

  timeseries(iso, onlyCountries) {
    let timeseries = onlyCountries
      ? this._data.timeseriesOnlyCountries
      : this._data.timeseries;

    if (iso) timeseries = filterByCode(timeseries, iso);

    return Promise.resolve({ count: timeseries.length, data: timeseries });
  }

  byId(id) {
    return Promise.resolve(this._data[id]);
  }

  async selfUpdate() {
    console.log('self UPDATE!');

    try {
      const result = await parseCsvAll();
      this.setData(result);
      this._lastUpdate = new Date().toISOString();

      return Promise.resolve('SelfUpdate is done!');
    } catch (error) {
      return Promise.reject('SelfUpdate cannot be done!');
    }
  }
}

export default new CasesDatabase();
