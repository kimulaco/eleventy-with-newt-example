import { defineErrorTracker } from './utils/errorTracking'
import '../sass/main.scss'

(() => {
  console.log('start main.js')
  defineErrorTracker()
})()
