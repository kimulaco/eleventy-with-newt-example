export const defineErrorTracker = () => {
  window.onerror = (message, source, lineno, colno, error) => {
    console.log(message, source, lineno, colno, error)
  }
}
