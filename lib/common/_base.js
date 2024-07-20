export const getOS = () => {
  let os = null;

  const platform = window.navigator.platform,
    macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"],
    windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"],
    iosPlatforms = ["iPhone", "iPad", "iPod"],
    userAgent = window.navigator.userAgent;
  if (macosPlatforms.indexOf(platform) !== -1) {
    os = "Mac OS";
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = "iOS";
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = "Windows";
  } else if (/Android/.test(userAgent)) {
    os = "Android";
  } else if (!os && /Linux/.test(platform)) {
    os = "Linux";
  }
  return os;
};

export const postRequest = async function (
  endpoint,
  data,
  jwtToken = null,
  extraOpts = {}
) {
  const opts = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data,
      _channel: `${getOS()}`,
      _token: jwtToken,
    }),
  };

  const rawResponse = await fetch(endpoint, opts);

  let content = null;
  if (extraOpts.blob) {
    content = await rawResponse.blob();
  } else {
    content = await rawResponse.json();
  }

  if (rawResponse.status === 401) {
    throw { error: "Unauthorized", content };
  }
  if (rawResponse.status !== 200) throw content;

  return content;
};

export const postMultimedia = async function (endpoint, form) {
  const opts = {
    method: "POST",
    headers: {},
    body: form,
  };

  const rawResponse = await fetch(endpoint, opts);
  console.log(rawResponse);
  const content = await rawResponse.json();
  console.log(content);
  if (rawResponse.status != 200) throw content;
  return content;
};

export const postFile = async function (endpoint, data, jwtToken = null) {
  const opts = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data,
      _channel: `${getOS()}`,
      _token: jwtToken,
      format: "excel",
    }),
  };

  const rawResponse = await fetch(endpoint, opts);

  const content = await rawResponse.blob();

  if (rawResponse.status != 200) throw content;
  return content;
};
