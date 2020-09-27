import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { BrowserRouter, Route, NavLink, Switch, Link } from "react-router-dom";

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
    };

    this.getPosts = this.getPosts.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFeaturedChange = this.handleFeaturedChange.bind(this);
  }

  getPosts() {
    $.ajax({
      url: '/api/blogs',
      type: 'GET',
      success: blogs => {
        this.setState({
          blogs: blogs,
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

  render() {
    return (
      <BrowserRouter>
        <div>
          <Link className="logo" to="/">
            <h1>BLOGRL.</h1>
            <p>Full Stack Blog Site Project</p>
          </Link>
          <nav className="nav">
            <NavLink exact to="/" className="nav-unselected" activeClassName="nav-selected">
              SEE ALL POSTS
            </NavLink>
            <NavLink to="/create" className="nav-unselected" activeClassName="nav-selected">
              WRITE A POST
            </NavLink>
            <NavLink to="/admin" className="nav-unselected" activeClassName="nav-selected">
              ADMIN
            </NavLink>
          </nav>
          <div className="main-image">
            <img src="/images/mainImagev2.jpg" />
          </div>
          <div className="main">
            <Switch>
              <Route exact path="/">
                <Feed blogs={this.state.blogs} />
              </Route>
              <Route path="/create">
                <Create handleSubmit={this.handleSubmit} />
              </Route>
              <Route path="/admin">
                <Admin
                  getPosts={this.getPosts}
                  handleFeaturedChange={this.handleFeaturedChange}
                  blogs={this.state.blogs} />
              </Route>
              <Route path="/article/:id" render={({ match }) =>
                this.state.blogs.length === 0 ?
                  <h2>Loading...</h2> :
                  <Post blog={this.state.blogs.find(blog => blog._id === match.params.id)} />
              } />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('blog'));
