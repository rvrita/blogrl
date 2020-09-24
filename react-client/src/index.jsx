import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import Post from './components/Post.jsx';
import Feed from './components/Feed.jsx';
import Admin from './components/Admin.jsx';
import Create from './components/Create.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      view: 'feed',
      blogs: [],
      currentBlog: null,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeView = this.changeView.bind(this);
    this.handleFeaturedChange = this.handleFeaturedChange.bind(this);
    this.handlePostClick = this.handlePostClick.bind(this);
  }

  getPosts() {
    $.ajax({
      url: '/api/blogs',
      type: 'GET',
      success: blogs => {
        this.setState({
          blogs: blogs,
          // currentBlog: blogs[0]
        }, () => console.log('state', this.state))
      }
    })
  }

  componentDidMount() {
    this.getPosts();
  }

  handleSubmit(postData) {
    $.ajax({
      url: '/api/blogs',
      type: 'POST',
      data: postData
    }, () => this.getPosts());
  }

  changeView(option) {
    this.setState({
      view: option
    });
  }

  handlePostClick(id) {
    $.ajax({
      url: `/api/blogs/${id}`,
      type: 'PATCH',
      success: (res) => {
        console.log(res);
      }
    }, () => this.getPosts());
    this.setState({
      currentBlog: this.state.blogs.find(b => b._id === id)
    }, () => this.changeView('anypostview'));
  }

  handleFeaturedChange(id) {
    var featured = !this.state.blogs.find(b => b._id === id).featured;
    $.ajax({
      url: `/api/blogs/${id}`,
      type: 'POST',
      data: { featured }
    }, () => this.getPosts());
  }

  renderView() {
    const { view } = this.state;
    if (view === 'feed') {
      return <Feed handleClick={this.handlePostClick} blogs={this.state.blogs} />
    } else if (view === 'admin') {
      return <Admin handleFeaturedChange={this.handleFeaturedChange} blogs={this.state.blogs} />
    } else if (view === 'create') {
      return <Create handleSubmit={this.handleSubmit} />
    } else {
      return <Post blog={this.state.currentBlog} />
    }
  }

  render() {
    return (
      <div>
        <div className="logo">
          <h1>BLOGRL.</h1>
          <p>Full Stack Blog Site Project</p>
        </div>
        <div className="nav">
          <span className={this.state.view === 'feed'
            ? 'nav-selected'
            : 'nav-unselected'}
            onClick={() => this.changeView('feed')}>
            SEE ALL POSTS
          </span>
          <span className={this.state.view === 'create'
            ? 'nav-selected'
            : 'nav-unselected'}
            onClick={() => this.changeView('create')}>
            WRITE A POST
          </span>
          <span className={this.state.view === 'admin'
            ? 'nav-selected'
            : 'nav-unselected'}
            onClick={() => this.changeView('admin')}>
            ADMIN
          </span>
        </div>
        <div className="main-image">
          <img src="images/mainImagev2.jpg" />
        </div>
        <div className="main">
          {this.renderView()}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('blog'));
