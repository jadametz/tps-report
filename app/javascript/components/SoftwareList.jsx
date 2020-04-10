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
    const allsoftwares = softwareList.map((software, index) => (
      <div key={index} className="col-md-6 col-lg-4">
        <div className="card mb-4">
          <img
            src={software.image}
            className="card-img-top"
            alt={`${software.name} image`}
          />
          <div className="card-body">
            <h5 className="card-title">{software.name}</h5>
            <Link to={`/software/${software.id}`} className="btn custom-button">
              View Software
            </Link>
          </div>
        </div>
      </div>
    ));
    const noSoftware = (
      <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
        <h4>
          No software yet. Why not <Link to="/new_software">add some</Link>
        </h4>
      </div>
    );

    return (
      <>
        <section className="jumbotron jumbotron-fluid text-center">
          <div className="container py-5">
            <h1 className="display-4">Registered Software</h1>
            <p className="lead text-muted">
              Below is a list of all registered software.
            </p>
          </div>
        </section>
        <div className="py-5">
          <main className="container">
            <div className="text-right mb-3">
              <Link to="/software" className="btn custom-button">
                Register New Software
              </Link>
            </div>
            <div className="row">
              {softwareList.length > 0 ? allsoftwares : noSoftware}
            </div>
            <Link to="/" className="btn btn-link">
              Home
            </Link>
          </main>
        </div>
      </>
    );
  }
}

export default SoftwareList;
