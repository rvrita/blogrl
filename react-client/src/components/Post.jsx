import React from 'react';
import moment from 'moment';
import $ from 'jquery';
import markdownParser from '../../utils/markdownParser.js';

class Post extends React.PureComponent {
  componentDidMount() {
    // Increment view count
    $.ajax({
      url: `/api/blogs/${this.props.blog._id}`,
      type: 'PATCH',
      success: (res) => {
        console.log(res);
      }
    });
  }

  render() {
    var { props } = this;
    var article = props.blog.body;
    var paragraphs = article.split('\n\n');

    return (
      <div className="post">
        <h1 className="post-title">{props.blog.title}</h1>
        <div className="post-byline"><span className="post-byline-author">{props.blog.author}</span> {moment(props.blog.createdAt).fromNow()}</div>
        <img src={`/${props.blog.imageUrl}`} className="post-image" />
        {paragraphs.map((p, index) => {
          return (<p key={index} dangerouslySetInnerHTML={{ __html: markdownParser(p) }} />)
        })}
      </div>
    );
  }
}

export default Post;
