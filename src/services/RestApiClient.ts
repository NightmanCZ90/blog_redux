import { ArticleList } from '../types/articles';
import { AccessToken, Tenant } from '../types/user';
import ApiClient from './ApiClient';

class RestApiClient extends ApiClient {

  /**
   * Authentication
   */

  async signUp(body: {
    name: string,
    password: string,
  }) {
    return this.axiosRequest<Tenant>({
      url: '/tenants',
      method: 'POST',
      body,
    })
  }

  async login(body: {
    username: string,
    password: string,
  }) {
    return this.axiosRequest<AccessToken>({
      url: '/login',
      method: 'POST',
      body,
    })
  }

  /**
   * Articles
   */

   async getArticles() {
    return this.axiosRequest<ArticleList>({
      url: '/articles',
      method: 'GET',
    })
  }
}

export default new RestApiClient();
