export const CONST = {
  //Custom Metrics Names
  ITERATIONS_MAX: 'iterations_max',
  SQL_REQ_DURATION: 'sql_req_duration',
  ITERATIONS_STAGE: 'y_iterations_stage_',
  DURATION_STAGE: 'y_duration_stage_',
  REQ_DURATION_STAGE: 'y_http_req_duration_stage_',
  FAILED_REQUEST_STAGE: 'y_failed_request_stage_',
  METRIC_FAILED_REQUEST: 'failed_request',
  METRIC_HTTP_REQ_FAILED: 'http_req_failed',
  METRIC_HTTP_REQ_DURATION: 'http_req_duration',
  METRIC_HTTP_REQ_ERROR_COUNTER: 'http_req_error_counter',
  METRIC_ITERATIONS: 'iterations',
  METRIC_SLOW_REQUEST: 'slow_request',
  //Error Codes Types in k6
  TYPE_ERROR_CODES: {
    TEXT: 'TEXT',
    GENERAL: 'GENERAL',
    DNS: 'DNS',
    TCP: 'TCP',
    TLS: 'TLS',
    HTTP4xx: 'HTTP4xx',
    HTTP5xx: 'HTTP5xx',
    HTTP2: 'HTTP2',
  },
  //Log Requests Information?
  LOG_REQUEST_INFO: false,
  LOG_REQUEST_URL: false,
  LOG_REQUEST_HEADERS: false,
  LOG_REQUEST_BODY: true,
  //Log Response Information?
  LOG_RESPONSE_HEADERS: false,
  LOG_RESPONSE_BODY: true,
  //Others Logs Configurations
  SHOW_CONSOLE_LOG: false,
  LOG_MAX_AMOUNT: 100,
};
