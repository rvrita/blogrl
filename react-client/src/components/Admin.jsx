import React from 'react';
import moment from 'moment';

const Admin = (props) => {
  return (
    <div>
      <h2 className="stats">Stats</h2>
      <ul>
        {props.blogs.map((blog, index) => {
          return (
            <li className="post-list-entry" key={index}>
              <div className="post-list-entry-title">{blog.title}</div>
              <div className="post-list-entry-byline">{blog.author} {moment(blog.createdAt).fromNow()}</div>
              <div className="stats-list-item-views">Views: {blog.views}</div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Admin;

