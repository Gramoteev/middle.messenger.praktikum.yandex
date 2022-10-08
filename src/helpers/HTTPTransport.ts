export enum METHODS {
  GET = "GET",
  PUT = "PUT",
  POST = "POST",
  DELETE = "DELETE",
}

type Options = {
  method: METHODS;
  data?: any;
  timeout?: number;
  headers?: Record<string, string>;
}

function queryStringify(data = {} ): string {
  return Object.entries(data).reduce((previousValue, [key, value]) =>
    `${previousValue}${previousValue ? '&': '?'}${key}=${value}`,
    ''
  );
}

class HTTPTransport {
  get(url:string, options: Options): Promise<XMLHttpRequest> {
    if (options.data) {
      url = url + queryStringify(options.data);
    }
    return this.request(url, { ...options, method: METHODS.GET });
  }

  post(url:string, options: Options): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHODS.POST });
  }

  put(url:string, options: Options): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHODS.PUT });
  }

  delete(url:string, options: Options): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHODS.DELETE });
  }

  request(url: string, options: Options = { method: METHODS.GET }, timeout = 5000): Promise<XMLHttpRequest> {
    const { method, data, headers = {} } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      Object.entries(headers).forEach(([key, value]) =>
        xhr.setRequestHeader(key, value));


      xhr.onload = function() {
        resolve(xhr);
      };

      xhr.timeout = timeout;
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}
