import { exec, file } from '../../libs/index.js';
import { CONST } from '../constants.js';

export function printSqlError(infoResponse, pathFileName) {
  if (typeof infoResponse == 'object') {
    infoResponse = JSON.stringify(infoResponse);
  }
  console.error(infoResponse);

  if (pathFileName) {
    file.appendString(pathFileName, infoResponse + '\n');
  }
}

export function printError(infoResponse, pathFileName) {
  let response = JSON.parse(JSON.stringify(infoResponse));
  response.more = {};

  response.more.vu = exec.vu.idInTest;
  response.more.responseTime = `${(response.timings.waiting * 1).toFixed(0)} ms`;
  response.more.iterationInInstance = exec.scenario.iterationInInstance;
  response.more.name = exec.scenario.name;

  const printHeaderRequest = (headers) => {
    return JSON.stringify(
      headers,
      (key, value) => {
        if (Array.isArray(value)) {
          return value[0];
        }
        return value;
      },
      1
    )
      .replace('\n', '')
      .replace('\n}', '}');
  };

  // Personalizar la impresión del request
  const request = response.request;
  let requestInfo = '';

  if (CONST.LOG_REQUEST_INFO) {
    const req_url_info = CONST.LOG_REQUEST_URL ? `${request.method} ${request.url}` : '';
    const req_headers_info = CONST.LOG_REQUEST_HEADERS
      ? `\n${printHeaderRequest(request.headers)}`
      : '';
    const req_body = CONST.LOG_REQUEST_BODY ? `\nRequestBody:\n ${request.body}` : '';

    requestInfo = 
    `[Request]: ${req_url_info} vu=${response.more.vu} iter=${response.more.iterationInInstance} error_code=${response.error_code} ${req_headers_info} ${req_body}\n\n`;
  }

  // Personalizar la impresión del response
  const resp_headers_info = CONST.LOG_RESPONSE_HEADERS
    ? `\n${printHeaderRequest(response.headers)}`
    : '';
  const resp_body = CONST.LOG_RESPONSE_BODY ? `\nResponseBody:\n ${response.body}` : '';
  const responseInfo = `[Response]: ${response.more.responseTime} status ${response.status} ${response.error} ${response.status_text} ${resp_headers_info} ${resp_body}\n\n`;

  const saveInfoResponse = requestInfo + responseInfo;

  if (CONST.SHOW_CONSOLE_LOG) {
    console.error(saveInfoResponse);
  }

  const test_iteration = exec.scenario.iterationInTest + 1;
  if (pathFileName && test_iteration <= CONST.LOG_MAX_AMOUNT) {
    file.appendString(pathFileName, saveInfoResponse);
  }
}
