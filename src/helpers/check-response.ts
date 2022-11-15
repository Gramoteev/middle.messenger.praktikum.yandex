export default function checkResponse(res: any) {
  if (res === 'OK') {
    return {};
  }
  return JSON.parse(res);
}
