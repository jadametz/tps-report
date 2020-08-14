import React from "react";
import { Link } from "react-router-dom";
import Alert from "./Alert";

class NewSoftware extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: "",
      name: "",
      org: "",
      full_name: "",
      in_use_release: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
  }

  stripHtmlEntities(str) {
    return String(str)
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const url = "/api/v1/software/create";
    const name = this.state.name.trim();
    const org = this.state.org.trim();
    const full_name = org + "/" + name;
    const in_use_release = this.state.in_use_release.trim();

    const body = {
      name,
      org,
      full_name
      in_use_release
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("The create failed!");
      })
      .then(response => this.props.history.push(`/software/${response.id}`))
      .catch(error => {
        console.log(error.message)
        this.setState({ alert: error.message })
      });
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <h1 className="font-weight-normal mb-5">
              Add new software.
            </h1>
            { this.state.alert && (
              <Alert>{ this.state.alert }</Alert>)
            }
            <form onSubmit={this.onSubmit}>
            <div className="form-group">
                <label htmlFor="org">GitHub Organization</label>
                <input
                  type="text"
                  name="org"
                  id="org"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="softwareName">Software Name</label>
                <input
                  type="text"
                  name="name"
                  id="softwareName"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="softwareInUseRelease">Version</label>
                <input
                  type="text"
                  name="in_use_release"
                  id="softwareInUseRelease"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
              </div>
              <button type="submit" className="btn custom-button mt-3">
                Create software
              </button>
              <Link to="/" className="btn btn-link mt-3">
                Back to Software List
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default NewSoftware;
