import React from "react";
import { Link } from "react-router-dom";

class SoftwareList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      softwareList: []
    };
  }

  componentDidMount() {
    const url = "/api/v1/software/index";
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ softwareList: response }))
      .catch(() => this.props.history.push("/"));
  }

  render() {
    const { softwareList } = this.state;

    const allsoftwares = (
      <table class="table table-striped table-hover">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Organization</th>
            <th scope="col">Repository</th>
            <th scope="col">Latest Release</th>
            <th scope="col">Latest Release Date</th>
          </tr>
        </thead>
        <tbody>
          {softwareList.map((software, index) => (
            <tr>
              <td>{software.org}</td>
              <td><Link to={`/software/${software.id}`}>{software.name}</Link></td>
              <td>{software.latest_release}</td>
              <td>{software.latest_release_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );

    const noSoftware = (
      <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
        <h4>
          No software yet. <Link to="/software">Add some!</Link>
        </h4>
      </div>
    );

    return (
      <>
        <section className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-4">Welcome to the TPS Report</h1>
            <p className="lead text-muted">
              Below is a list of all registered Third Party Software (TPS).
            </p>
          </div>
        </section>
        <div>
          <main className="container">
            <div className="text-left mb-3">
              <Link to="/software" className="btn custom-button">
                Register New Software
              </Link>
            </div>
            <div className="row py-5">
              {softwareList.length > 0 ? allsoftwares : noSoftware}
            </div>
          </main>
        </div>
      </>
    );
  }
}

export default SoftwareList;
