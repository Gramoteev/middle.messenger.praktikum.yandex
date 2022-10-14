import queryStringify from "../helpers";

export enum Methods {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

type Options = {
  method: Methods;
  data?: any;
  timeout?: number;
  headers?: Record<string, string>;
}


export default class HTTPTransport {
  get(url:string, options: Options): Promise<XMLHttpRequest> {
    if (options.data) {
      url = url + queryStringify(options.data);
    }
    return this.request(url, { ...options, method: Methods.GET });
  }

  post(url:string, options: Options): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: Methods.POST });
  }

  put(url:string, options: Options): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: Methods.PUT });
  }

  delete(url:string, options: Options): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: Methods.DELETE });
  }

  request(url: string, options: Options = { method: Methods.GET }): Promise<XMLHttpRequest> {
    const { method, data, headers = {}, timeout = 5000 } = options;

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

      if (method === Methods.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  }
}
