export default function reportError(error: Error | string) {
  // It has to be sentry or some other error tracking service for real projects
  console.log(error)
}