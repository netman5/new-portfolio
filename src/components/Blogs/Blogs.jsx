import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { getBlogs } from '../../features/blogs/blogSlice';
import NoData from '../Works/NoData';

const Blogs = () => {
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(getBlogs());
  }, []);

  const blogLists = blogs.filter((blog) => blog.categories.length > 0).slice(0, 6);

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  if (error) {
    return <NoData error={error} />;
  }

  return (
    <div className="blog_container">
      <div className="blog_container__top">
        <h3>Recent posts</h3>
        <div className="blog_container__items">
          {blogLists.map((blog) => (
            <div className="blog_container__item" key={blog.guid}>
              <div className="blog_container__item__image">
                <img src={blog.thumbnail} alt={blog.title} />
              </div>
              <div className="blog_container__item__content">
                <a href={blog.link} target="_black" rel="noopener noreferrer" className="blog-title">
                  {blog.title}
                  <p className="published">
                    Published:
                    {' '}
                    {moment(blog.pubDate).format('dddd, MMMM Do YYYY')}

                  </p>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;