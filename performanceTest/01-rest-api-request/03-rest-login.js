import { check, group, sleep } from 'k6';
import http from 'k6/http';
import { randomIntBetween } from '../../libs/k6-utils/1.4.0/index.js';
import {
  readCsvFile,
  getDataInOrder,
  getSecuencialData,
  getRandomData,
  getSameDataByUser,
} from '../../utils/getDataFromCsvFile.js';
import { generalSummary } from '../../utils/generate-reports/summaryConfig.js';

export const options = {
  // vus: 1,
  // iterations: 1,
  stages: [
    { target: 20, duration: '20s' },
    { target: 20, duration: '60m' },
    { target: 0, duration: '20s' },
  ],
};

const csvRead = readCsvFile('user', './data/test-data.02.csv');

export default function () {
  const index = Math.floor(Math.random() * csvRead.length);
  const data = csvRead[index];



  const response_login = doLogin(data);
  

  check(response_login, {
    'login status was 200 or 401': (r) => r.status == 200 || 401,
    'login response -> OK': (r) => {
      if (r.status == 200) {
        return r.body.includes('token');
      }
      if (r.status == 401) {
        return r.body.includes('username or password is incorrect');
      }
    },
  });

  check(response_login, {
    'login status was 200 or 401': (r) => r.status == data.expected_status,
    'login response -> OK': (r) => {
      if (r.status == 200) {
        return r.body.includes('token');
      }
      if (r.status == 401) {
        return r.body.includes('username or password is incorrect');
      }
    },
  });

  if (response_login.status != 200 && response_login.status != 401) {
    console.log(response_login);
  }

  sleep(randomIntBetween(1, 3));
}

function doLogin(data) {
  const base_url = 'https://fakestoreapi.com';
  const url_login = `${base_url}/auth/login`;

  let params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const payload_login = `
  {
    "username": "${data.username}",
    "password": "${data.password}"
  }
  `;

  return http.post(url_login, payload_login, params);
}

export function handleSummary(data) {
  return generalSummary(data);
}
