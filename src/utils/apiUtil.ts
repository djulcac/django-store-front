export function validateJSON(response:any) {
  if (response.headers['content-type'].includes('application/json'))
    return true;
  throw new Error('The response is not JSON');
}
