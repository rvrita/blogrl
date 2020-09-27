import React from 'react';
import moment from 'moment';

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchField: '',
      sortDirection: -1,
      sortBy: '',
    }
    this.updateInputValue = this.updateInputValue.bind(this);
  }

  sortByOnClick(column) {
    let sortDir = this.state.sortDirection;
    if (column === this.state.sortBy) {
      sortDir *= -1; // same column, toggle sort direction
    } else {
      sortDir = 1;   // new column, reset sort direction
    }
    this.setState({
      sortDirection: sortDir,
      sortBy: column
    });
  }

  updateInputValue(e) {
    var value = e.target.value;
    this.setState ({
      searchField: value
    }, () => console.log(this.state));
  }

  render() {
    const {sortDirection, sortBy} = this.state;
    const sortedBlogs = this.props.blogs.sort(function (a, b) {
      if (a[sortBy] > b[sortBy]) {
        return 1 * sortDirection;
      }
      if (a[sortBy] < b[sortBy]) {
        return -1 * sortDirection;
      }
      return 0;
    });

    return (
      <div>
        <h2 className="stats">STATS</h2>
        <input className="search-bar" placeholder="Filter by author" type="text" value={this.state.searchField} onChange={this.updateInputValue} />
        <button onClick={() => this.props.getPosts()}>Refresh</button>
        <table className="stat-table">
          <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>
              <button className="header-button" type="button" onClick={() => this.sortByOnClick('createdAt')}>
                Date
              </button>
            </th>
            <th>
              <button className="header-button" type="button" onClick={() => this.sortByOnClick('views')}>
                Views
              </button>
            </th>
            <th>Featured</th>
          </tr>
          {sortedBlogs.filter(blog => blog.author.toLowerCase().includes(this.state.searchField.toLowerCase())).map((blog, index) => {
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
          </tbody>
        </table>
      </div>
    )
  }
}

export default Admin;

