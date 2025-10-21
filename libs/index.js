// ir a libreria para optener ultimas actualizaciones https://jslib.k6.io/
export { check, fail, group, sleep } from 'k6';
export { Counter, Rate, Gauge, Metric, Trend } from 'k6/metrics';
export { SharedArray } from 'k6/data';
export { default as encoding } from 'k6/encoding';

export {
  randomIntBetween,
  randomItem,
  randomString,
  findBetween,
  getCurrentStageIndex,
  uuidv4,
  normalDistributionStages
} from './k6-utils/1.4.0/index.js';

export { AWSConfig, SignatureV4 } from './aws/0.9.0/aws.js';

export { jUnit, textSummary } from './k6-summary/0.0.1/index.js';

export { htmlReport } from './k6-reporter/2.4.0/bundle.js';
// Importaciones de librerías externas
export { default as papaparse } from './papaparse/5.1.1/index.js';
export { default as exec } from 'k6/execution';
export { default as https } from 'k6/http';
export { default as file } from 'k6/x/file';
export { default as read } from 'k6/x/read';
export { default as faker } from './faker/index.js';