import { axiosPrivate } from './axios';

type Query = Record<string, any>;

interface RequestOptions {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  url: string,
  query?: Query,
  body?: any,
  headers?: Record<string, string>,
}

interface AuthRequestOptions extends RequestOptions {
  accessToken: string,
}

abstract class ApiClient {

  /**
   * Converts `Query` object to match the type of `URLSearchParams`.
   */
  getQueryObject = (query?: Query): Record<string, string> => Object.entries(query ?? {})
    .reduce((entries, entry) => ({
      ...entries, [entry[0].toString()]: entry[1],
    }), {});

  async axiosRequest<T>(options: RequestOptions) {
    try {
      const { data } = await axiosPrivate.request<T>({
        ...options,
        url: options.url,
        method: options.method,
        data: options.body,
      })
      return data;
    } catch(err: any) {
      throw err.response.data.message;
    }
  }

  async authorizedAxiosRequest<T>(options: AuthRequestOptions) {
    return this.axiosRequest<T>({
      ...options,
      headers: { ...options.headers, Authorization: `Bearer ${options.accessToken}` },
    })
  }
}

export default ApiClient;
