import cookie from 'js-cookie';

// https://github.com/js-cookie/js-cookie/tree/latest#readme

// setting a cookie that expires after one day
export const setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1,
      path: '/'
    });
  }
};

// removing the cookie
export const removeCookie = (key, req) => {
  if (process.browser) {
    cookie.remove(key, {
      expires: 1
    });
  }
};

// checking if we run on node-server or browser
export const getCookie = (key, req) => {
  return process.browser ? getCookieFromBrowser(key) : getCookieFromServer(key, req);
};

const getCookieFromBrowser = key => {
  return cookie.get(key);
};

const getCookieFromServer = (key, req) => {
  if (!req.headers.cookie) {
    return undefined;
  }
  const rawCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith(`${key}=`));
  if (!rawCookie) {
    return undefined;
  }
  return rawCookie.split('=')[1];
};
