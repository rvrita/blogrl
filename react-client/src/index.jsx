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
      sortDirection: -1,
      sortBy: ''
    }
    
    this.getPosts = this.getPosts.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeView = this.changeView.bind(this);
    this.handleFeaturedChange = this.handleFeaturedChange.bind(this);
    this.handlePostClick = this.handlePostClick.bind(this);
    this.sortByOnClick = this.sortByOnClick.bind(this);
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
    }).always(() => this.getPosts());
  }

  changeView(option) {
    this.setState({
      view: option
    });
  }

  sortByOnClick(column) {
    const newBlogs = this.state.blogs.slice();
    let sortDir = this.state.sortDirection;
    if (column === this.state.sortBy) {
      sortDir *= -1; // same column, toggle sort direction
    } else {
      sortDir = 1;   // new column, reset sort direction
    }
    newBlogs.sort(function (a, b) {
      if (a[column] > b[column]) {
        return 1 * sortDir;
      }
      if (a[column] < b[column]) {
        return -1 * sortDir;
      }
      return 0;
    });
    this.setState({
      blogs: newBlogs,
      sortDirection: sortDir,
      sortBy: column
    });
  }

  handlePostClick(id) {
    $.ajax({
      url: `/api/blogs/${id}`,
      type: 'PATCH',
      success: (res) => {
        console.log(res);
      }
    }).always(() => this.getPosts());
    this.setState({
      currentBlog: this.state.blogs.find(b => b._id === id)
    }, () => this.changeView('anypostview'));
  }

  handleFeaturedChange(id) {
    var featured = !this.state.blogs.find(b => b._id === id).featured;

    // optimistic update
    const blogIdx = this.state.blogs.findIndex(b => b._id === id);
    const newBlogs = this.state.blogs.slice();
    newBlogs[blogIdx].featured = featured;
    this.setState({
      blogs: newBlogs,
    });

    $.ajax({
      url: `/api/blogs/${id}`,
      type: 'POST',
      data: { featured }
    }).always(() => this.getPosts());
  }

  renderView() {
    const { view } = this.state;
    if (view === 'feed') {
      return <Feed handleClick={this.handlePostClick} blogs={this.state.blogs} />
    } else if (view === 'admin') {
      return <Admin sortByOnClick={this.sortByOnClick} handleFeaturedChange={this.handleFeaturedChange} blogs={this.state.blogs} />
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
