import React, { Component } from "react";
import "./App.css";
import axios from "axios";


const url = 'https://jsonplaceholder.typicode.com/posts'

class App extends Component {
  state = {
    posts: []
  };
  // getting the data via axios 
  async componentDidMount() {
    const response = await axios.get(url);
    const { data: posts } = response;
    console.log(response);
    this.setState({posts});
  }

  handleAdd = async () => {
    // creating the data
    const obj = { title: 'a', body: 'b' };
    const { data: post } = await axios.post(url, obj);

    // storing the data
    const posts = [post, ...this.state.posts];
    this.setState ( { posts } );
    // console.log("Add");
  };

  handleUpdate = async post => {
    // sending req
    post.title = "UPDATE";
    await axios.put(url + "/" + post.id, post);
    
    // updating
    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = {...post};
    this.setState({ posts });

    // console.log("Update", post);
  };

  handleDelete = async post => {
    // optimistic deleting 
    const originalPosts =  this.state.posts;

    const posts = this.state.posts.filter(p => p.id !== post.id);
    this.setState({ posts });

    try {
      await axios.delete(url + '/' + post.id);
      // throw new Error("");
    } catch (ex) {
      // alert("something failed while deleting");
      this.setState ( { posts: originalPosts } )
    }
    // console.log("Delete", post);
  };

  render() {
    return (
      <React.Fragment>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
