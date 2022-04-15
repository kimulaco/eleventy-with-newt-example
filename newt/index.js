const axios = require('axios')
const { NEWT_SPACE_UID, NEWT_CDN_API_TOKEN } = process.env

const newt = axios.create({
  baseURL: `https://${NEWT_SPACE_UID}.cdn.newt.so/v1`,
})

newt.interceptors.request.use((config) => {
  config.headers = {
    Authorization: `Bearer ${NEWT_CDN_API_TOKEN}`,
  }
  return config
})

exports.newt = newt
