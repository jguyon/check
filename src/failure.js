export default function failure(functionName, message) {
  return `check.${functionName}: ${message}`;
}
