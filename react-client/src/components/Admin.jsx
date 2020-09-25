import React from 'react';
import moment from 'moment';

class Admin extends React.Component {
  constructor() {
    super();
    this.state = {
      searchField: ''
    }
    this.updateInputValue = this.updateInputValue.bind(this);
  }

  updateInputValue(e) {
    var value = e.target.value;
    this.setState ({
      searchField: value
    }, () => console.log(this.state));
  }

  render() {
    return (
      <div>
        <h2 className="stats">STATS</h2>
        <input className="search-bar" placeholder="Filter by author" type="text" value={this.state.searchField} onChange={this.updateInputValue} />
        <table className="stat-table">
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>
              <button className="header-button" type="button" onClick={() => this.props.sortByOnClick('createdAt')}>
                Date
              </button>
            </th>
            <th>
              <button className="header-button" type="button" onClick={() => this.props.sortByOnClick('views')}>
                Views
              </button>
            </th>
            <th>Featured</th>
          </tr>
          {this.props.blogs.filter(blog => blog.author.toLowerCase().includes(this.state.searchField.toLowerCase())).map((blog, index) => {
            return (
              <tr className="post-list-entry" key={index}>
                <td className="post-list-entry-title">{blog.title}</td>
                <td className="post-list-entry-byline">{blog.author}</td>
                <td>{moment(blog.createdAt).fromNow()}</td>
                <td className="stats-list-item-views">{blog.views}</td>
                <td>
                  <form>
                    <label>
                      Featured:
                      <input
                        name="featured"
                        type="checkbox"
                        checked={blog.featured}
                        onChange={() => this.props.handleFeaturedChange(blog._id)} />
                    </label>
                  </form>
                </td>
              </tr>
            )
          })}
        </table>
      </div>
    )
  }
}

export default Admin;

