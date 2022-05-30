import { ArticleDetail, ArticleList } from '../types/articles';
import { ImageInfo } from '../types/images';
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

  async createArticle(body: { title: string, imageId: string, content: string }, accessToken: string) {
    return this.authorizedAxiosRequest<ArticleDetail>({
      url: '/articles',
      method: 'POST',
      accessToken,
      body,
    })
  }

  /**
   * Tenants
   */

  async getTenant(tenantId: string, accessToken: string) {
    return this.authorizedAxiosRequest<Tenant>({
      url: `/tenants/${tenantId}`,
      method: 'GET',
      accessToken,
    })
  }

  /**
   * Images
   */

   async uploadImage(body: { image: string | ArrayBuffer | null}, accessToken: string) {
    return this.authorizedAxiosRequest<ImageInfo[]>({
      url: '/images',
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      accessToken,
      body,
    })
  }
}

export default new RestApiClient();
