export async function onRequest({ request, next }) {
  const url = new URL(request.url);
  if (url.hostname === 'www.commission-calc.com') {
    url.hostname = 'commission-calc.com';
    return Response.redirect(url.toString(), 301);
  }
  return next();
}
