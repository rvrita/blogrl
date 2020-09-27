import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

const Feed = (props) => (
  <div className="feed">
    <ul className="feed-list">
      {props.blogs.map((blog, index) => {
        var featuredClass = blog.featured ? 'featured-post' : '';
        return (
          <li className={'feed-list-item ' + featuredClass} key={index}>
            <Link to={`/article/${blog._id}`}>
              <div className="feed-list-item-title">{blog.title}</div>
              <div className="feed-list-item-byline"><span className="feed-list-item-byline-author">{blog.author}</span> {moment(blog.createdAt).fromNow()}</div>
              <img src={blog.imageUrl} className="feed-list-item-image" />
              <span className="feed-list-item-lede">{`${blog.body.substring(0, 350)}...`}</span>
            </Link>
          </li>
        )
      })}
    </ul>
  </div>
);

export default Feed;
