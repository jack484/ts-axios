import { isPlainObject } from './util'

export function transfromResquest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}