import React from 'react';
import moment from 'moment';
import $ from 'jquery';
import markdownParser from '../../utils/markdownParser.js'

const Post = (props) => {
  console.log(props.blog);
  var blogId = props.blog._id;
  $.ajax({
    url: `/api/blogs/${blogId}`,
    type: 'PATCH',
    success: (res) => {
      console.log(res);
    }
  })

  var article = props.blog.body;
  var paragraphs = article.split('\n\n');

  return (
    <div className="post">
      <h1 className="post-title">{props.blog.title}</h1>
      <div className="post-byline"><span className="post-byline-author">{props.blog.author}</span> {moment(props.blog.createdAt).fromNow()}</div>
      <img src={props.blog.imageUrl} className="post-image" />
      {paragraphs.map((p, index) => {
        return (<p key={index}>{markdownParser(p)}</p>)
      })}
    </div>
  )
}

export default Post;
