import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import Post from './components/Post.jsx';
import Feed from './components/Feed.jsx';
import Admin from './components/Admin.jsx';
import Create from './components/Create.jsx';

/*
  READ THESE COMMENTS AS A PART OF STEP TWO

  To manage switching among the different views in this application,
  we have implemented a "view switcher" in the `App` component.

  There are three key parts to the view switcher:
    1. The `view` property defined on the `App` component's `state`
    2. The `changeView` method defined on the `App` component
    3. The `renderView` method defined on the `App` component

  The value of the `view` property will determine which gets returned by the
  `renderView` method, which is invoked inside the `App` component's `render`.
  You can set the initial value of `view` in the `App` component's `constructor`
  function, determining what view gets rendered "by default".

  If you haven't modified this code yet, the view switcher observes the following rules:
  - The default view is 'feed'
  - If the view is set to 'feed', the `<Feed>` component is displayed
  - If the view is set to any other value, the `<Post>` component is displayed
  - The `changeView` function should change the value of `view` in the `App` component's state.

  You'll make some refactors and additions to this view switcher throughout the
  next steps of the assessment. When you're ready, return to the README.
*/

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
  }

  componentDidMount() {
    $.ajax({
      url: '/api/blogs',
      type: 'GET',
      success: blogs => {
        this.setState({
          blogs: blogs,
          currentBlog: blogs[0]
        }, () => console.log('state', this.state.blogs))
      }
    })
  }

  handleSubmit(postData) {
    // console.log('submitted');
    // console.log('in handleSubmit', postData);
    $.ajax({
      url: '/api/blogs',
      type: 'POST',
      data: postData
    })
  }

  changeView(option) {
    this.setState({
      view: option
    });
  }

  renderView() {
    const {view} = this.state;

    if (view === 'feed') {
      return <Feed handleClick={(id) => {
        this.setState({ currentBlog: this.state.blogs.find(b => b._id === id) }, () => this.changeView('anypostview'));
        
      }} blogs={this.state.blogs}/>
    } else if (view === 'admin') {
      return <Admin blogs={this.state.blogs}/>
    } else if (view === 'create') {
      return <Create handleSubmit={this.handleSubmit}/>
    } else {
      return <Post blog={this.state.currentBlog}/>
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
          {/* <span className={this.state.view === 'feed'
            ? 'nav-selected'
            : 'nav-unselected'}
            onClick={() => this.changeView('admin')}>
            LOGIN
          </span> */}
        </div>
        <div className="main-image">
          <img src="images/mainImagev2.jpg"/>
        </div>
        <div className="main">
          {this.renderView()}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('blog'));
