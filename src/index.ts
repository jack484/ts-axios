import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
import xhr from './xhr'
import { bulidURL } from './helpers/url'
import { transfromResquest, transfromResponse } from './helpers/data';
import { processHeaders } from './helpers/header';

function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then((res) => {
    return transformResponseData(res)
  })
}
function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transfromResponse(res.data)
  return res
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.headers = transformHeaders(config)
  config.data = transfromResquestData(config)
}

// 格式化URl
function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return bulidURL(url, params)
}

// 序列化data
function transfromResquestData(config: AxiosRequestConfig): any {
  return transfromResquest(config.data)
}

function transformHeaders(config: AxiosRequestConfig): void {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

export default axios