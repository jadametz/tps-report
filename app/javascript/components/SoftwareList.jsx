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
          <div className="card-body">
            <h5 className="card-title">{software.full_name}</h5>
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
