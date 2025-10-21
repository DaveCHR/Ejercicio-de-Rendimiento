import { Counter, Rate, Gauge, Trend } from 'k6/metrics';
import { CONST } from '../constants.js';
import execution from 'k6/execution';
import { getCurrentStageIndex } from '../../libs/index.js';

export class Thresholds {
  constructor(stages) {
    this.stages = stages;
    this.sqlReqDuration = this.createTrendSqlRequestDuration();
    this.failRates = this.createRateByStages(stages);
    this.duration_stages = this.crateGaugeDurationByStage(stages);
    this.iterations_stages = this.createCounterInterationsByStage(stages);
    this.http_request_duration_stages = this.createTrendRequestDurationByStage(stages);
  }

  createRateByStages(numStages) {
    let failRateStages = {};

    const nameFailRate = CONST.FAILED_REQUEST_STAGE;
    failRateStages[CONST.METRIC_FAILED_REQUEST] = new Rate(CONST.METRIC_FAILED_REQUEST);

    for (let i = 0; i < numStages; i++) {
      const nameFailRate_stage = `${nameFailRate}${i}`;
      const nameFailRate_text = `${nameFailRate_stage}_${CONST.TYPE_ERROR_CODES.TEXT}`;
      const nameFailRate_general = `${nameFailRate_stage}_${CONST.TYPE_ERROR_CODES.GENERAL}`;
      const nameFailRate_tcp = `${nameFailRate_stage}_${CONST.TYPE_ERROR_CODES.TCP}`;
      const nameFailRate_tls = `${nameFailRate_stage}_${CONST.TYPE_ERROR_CODES.TLS}`;
      const nameFailRate_http4xx = `${nameFailRate_stage}_${CONST.TYPE_ERROR_CODES.HTTP4xx}`;
      const nameFailRate_http5xx = `${nameFailRate_stage}_${CONST.TYPE_ERROR_CODES.HTTP5xx}`;

      failRateStages[nameFailRate_stage] = new Counter(nameFailRate_stage);
      failRateStages[nameFailRate_text] = new Counter(nameFailRate_text);
      failRateStages[nameFailRate_general] = new Counter(nameFailRate_general);
      failRateStages[nameFailRate_tcp] = new Counter(nameFailRate_tcp);
      failRateStages[nameFailRate_tls] = new Counter(nameFailRate_tls);
      failRateStages[nameFailRate_http4xx] = new Counter(nameFailRate_http4xx);
      failRateStages[nameFailRate_http5xx] = new Counter(nameFailRate_http5xx);
    }
    
    // console.log("failRateStages: ",failRateStages);

    return failRateStages;
  }

  handleTypeErrorRequest(resp, isError) {
    let numberStage = 0;
    try {
      numberStage = getCurrentStageIndex();
    } catch (error) {}

    
    this.failRates[CONST.METRIC_FAILED_REQUEST].add(isError);
    const error_code = resp.error_code;
    let error_category = 'GENERAL';
    
    if (error_code === 0) {
      error_category = 'TEXT';
    } else if (1100 <= error_code && error_code <= 1199) {
      error_category = 'TCP';
    } else if (1200 <= error_code && error_code <= 1299) {
      error_category = 'TLS';
    } else if (1400 <= error_code && error_code <= 1499) {
      error_category = 'HTTP4xx';
    } else if (1500 <= error_code && error_code <= 1599) {
      error_category = 'HTTP5xx';
    }
    
    
    const nameFailRate_stage = `${CONST.FAILED_REQUEST_STAGE}${numberStage}_`;
    
    const nameFailRate_category = `${nameFailRate_stage}${CONST.TYPE_ERROR_CODES[error_category]}`;
    isError && this.failRates[nameFailRate_category].add(isError);
    
    // console.log("nameFailRate_category: ",nameFailRate_category,' numberStage', numberStage," - isError?: ",isError, "- error_category: ",error_category );
  }

  handleRequestDurationByStage(respDuration, numberStage) {
    this.http_request_duration_stages[`${CONST.REQ_DURATION_STAGE}${numberStage}`].add(respDuration);
  }

  createCounterInterationsByStage(numStages) {
    let iterationsByStage = {};
    for (let i = 0; i < numStages; i++) {
      iterationsByStage[`${CONST.ITERATIONS_STAGE}${i}`] = new Counter(`${CONST.ITERATIONS_STAGE}${i}`);
    }
    return iterationsByStage;
  }

  crateGaugeDurationByStage(numStages) {
    let durationByStep = {};
    for (let i = 0; i < numStages; i++) {
      durationByStep[`${CONST.DURATION_STAGE}${i}`] = new Gauge(`${CONST.DURATION_STAGE}${i}`, false);
    }
    return durationByStep;
  }
  
  createTrendRequestDurationByStage(numStages) {
    let requestDurationByStep = {};
    for (let i = 0; i < numStages; i++) {
      requestDurationByStep[`${CONST.REQ_DURATION_STAGE}${i}`] = new Trend(`${CONST.REQ_DURATION_STAGE}${i}`, true);
    }
    return requestDurationByStep;
  }

  createTrendSqlRequestDuration() {
    return new Trend(CONST.SQL_REQ_DURATION, true);
  }

  addSqlReqDuration(durationTime) {
    this.sqlReqDuration.add(durationTime);
  }

  addIterationByStage(indexStage) {
    this.iterations_stages[`${CONST.ITERATIONS_STAGE}${indexStage}`].add(1);
  }

  addDurationByStage(indexStage) {
    this.duration_stages[`${CONST.DURATION_STAGE}${indexStage}`].add(execution.instance.currentTestRunDuration);
  }
}
