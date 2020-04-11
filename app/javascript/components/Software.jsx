import React from "react";
import { Link } from "react-router-dom";

class Software extends React.Component {
  constructor(props) {
      super(props);
      this.state = {};
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
      .then(response => this.setState({ software: response}));
      // TODO
      // .catch(() => this.props.history.push("/software"));
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

    if (software) {
      return (
        <>
          <section className="jumbotron jumbotron-fluid">
            <div className="container">
              <h1 className="display-4">{software.full_name}</h1>
            </div>
          </section>
          <div>
            <main className="container">
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
    } else {
      console.log("loading")
      return (
        <div>Loading</div>
      )
    }
  }
}

export default Software;
