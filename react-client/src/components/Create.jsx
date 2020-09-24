import React from 'react';

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postTitle: '',
      author: '',
      imageUrl: '',
      postBody: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.value
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div className="create">
        <div className="create-editor">
          <h2>AUTHOR</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            this.props.handleSubmit(this.state)
          }}>
            <input
              className="create-input"
              type="text"
              placeholder="Post Title"
              value={this.state.postTitle}
              name="postTitle"
              onChange={this.handleInputChange}></input>
            <input
              className="create-input"
              type="text"
              placeholder="Author"
              value={this.state.author}
              name="author"
              onChange={this.handleInputChange}></input>
            <input
              className="create-input"
              type="text"
              placeholder="Image URL"
              value={this.state.imageUrl}
              name="imageUrl"
              onChange={this.handleInputChange}></input>
            <textarea
              className="create-body-textarea"
              placeholder="Post Body"
              value={this.state.postBody}
              name="postBody"
              onChange={this.handleInputChange}></textarea>
            <button className="create-submit-button" type="submit">Save post</button>
          </form>
        </div>
        <div className="create-preview">
          <h2>PREVIEW</h2>
        </div>
      </div>
    )
  }
}

export default Create;