import React from "react";
import { Link } from "react-router-dom";

class Software extends React.Component {
  constructor(props) {
      super(props);
      this.state = { software: {
        full_name: ""
      }};
      this.addHtmlEntities = this.addHtmlEntities.bind(this);
      this.deleteSoftware = this.deleteSoftware.bind(this);
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    const url = `/api/v1/software/show/${id}`;
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ software: response}))
      .catch(() => this.props.history.push("/"));
  }

  addHtmlEntities(str) {
    return String(str)
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
  }

  deleteSoftware() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const url = `/api/v1/software/destroy/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => this.props.history.push("/"))
      .catch(error => console.log(error.message));
  }

  render() {
    const { software } = this.state;

    return (
      <>
        <section className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-4">{software.full_name}</h1>
          </div>
        </section>
        <div>
          <main className="container">
            <table class="table table-striped table-hover">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Info</th>
                  <th scope="col">Your Version</th>
                  <th scope="col">Latest Release</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Version</td>
                  <td>TODO</td>
                  <td>{software.latest_release}</td>
                </tr>
                <tr>
                  <td>Release Date</td>
                  <td>TODO</td>
                  <td>{software.latest_release_date}</td>
                </tr>
              </tbody>
            </table>
            <div className="text-left mb-3">
              <button type="button" className="btn btn-danger" onClick={this.deleteSoftware}>
                Delete software
              </button>
            </div>
            <Link to="/" className="btn btn-link">
              Back to Software List
            </Link>
          </main>
        </div>
      </>
    );
  }
}

export default Software;
