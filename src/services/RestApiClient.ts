import { ArticleList } from '../types/articles';
import ApiClient from './ApiClient';

class RestApiClient extends ApiClient {

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
