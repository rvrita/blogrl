import React from 'react';
import moment from 'moment';

const Feed = (props) => (
  <div className="feed">
    <ul className="feed-list">
      {props.blogs.map((blog, index) => {
        return (
          <li className="feed-list-item" key={index}>
            <div className="feed-list-item-title" onClick={() => props.handleClick(blog._id)}>{blog.title}</div>
            <div className="feed-list-item-byline"><span className="feed-list-item-byline-author">{blog.author}</span> {moment(blog.createdAt).fromNow()}</div>
            <img src={blog.imageUrl} onClick={() => props.handleClick(blog._id)} className="feed-list-item-image" />
            <span className="feed-list-item-lede">{`${blog.body.substring(0,350)}...`}</span>
          </li>
        )
      })}
    </ul>
  </div>
);

export default Feed;
