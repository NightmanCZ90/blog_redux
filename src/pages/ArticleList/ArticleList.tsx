import './ArticleList.scss';
import { ArticleWithDates } from '../../types/articles';
import { useAppSelector } from '../../store';

const ArticleList: React.FC = () => {
  const { articles } = useAppSelector((state) => state.articleList);

  return (
    <div className="article-list">

      <div className="article-list__header">
        <h1>Recent articles</h1>
      </div>

      <div className="article-list__content">
        {renderArticles(articles)}
      </div>
    </div>
  )

  function renderArticles(articles: ArticleWithDates[]) {
    if (articles.length === 0) {
      return (
        <div>
          <h3>No results</h3>
        </div>
      )
    }

    return articles.map(article => (
      <div key={article.articleId}>{article.title}</div>
    ))
  }
}

export default ArticleList;