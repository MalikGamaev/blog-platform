import React, { useEffect } from 'react'
import './ArticleList.scss'
import ArticleItem from './ArticleItem'
import { Pagination, Spin } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { changePage, fetchGetArticle, fetchGetArticles } from '../../../store/reducers/articleReducer'
import {v4 as uuidv4 } from 'uuid'

const ArticleList = () => {
  const dispatch = useDispatch()
  const { loading, currentPage, totalCount } = useSelector((state) => state.article)
  const articles = useSelector((state) => state.article.articles)

  debugger
  const slug = useSelector((state) => state.article.slug)

  useEffect(() => {
    if (slug === '') return

    dispatch(fetchGetArticle(slug))
  }, [slug, dispatch])

  useEffect(() => {
    dispatch(fetchGetArticles())
  }, [])

  const onHandlerPage = (page) => {
    dispatch(changePage(page))
    const offset = page > 1 ? page * 10 - 10 : 0
    dispatch(fetchGetArticles(offset))
  }

  return (
    <ul className="article-list">
      {loading ? <Spin style={{ justifySelf: 'center' }} /> : articles.map((el) => <ArticleItem key={uuidv4()} data={el} />)}
      <Pagination
        current={currentPage}
        onChange={onHandlerPage}
        pageSize={10}
        total={totalCount}
        showSizeChanger={false}
      />
    </ul>
  )
}

export default ArticleList
