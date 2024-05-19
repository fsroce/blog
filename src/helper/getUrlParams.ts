function getUrlParams (url: string) {
  if (!url) return {}
  const searchParams = url.substring(1).split('&');
  const params: any = {};

  for (const param of searchParams) {
    const [key, value] = param.split('=');
    params[key] = value;
  }
  return params;
}

export default getUrlParams
