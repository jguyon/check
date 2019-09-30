export default function error(message, path = []) {
  return {
    isOk: false,
    path,
    message,
  };
}
