import React from "react";
import { Link } from "react-router-dom";

class Software extends React.Component {
  constructor(props) {
      super(props);
      this.state = { software: { attributes: "" } };

      this.addHtmlEntities = this.addHtmlEntities.bind(this);
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    const url = `/api/v1/show/${id}`;

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

  render() {
    const { software } = this.state;
    let attributes = "No attributes available";

    if (software.attributes.length > 0) {
      attributes = software.attributes
        .split(",")
        .map((ingredient, index) => (
          <li key={index} className="list-group-item">
            {ingredient}
          </li>
        ));
    }
    const softwareAttributes = this.addHtmlEntities(software.instruction);

    return (
      <div className="">
        <div className="hero position-relative d-flex align-items-center justify-content-center">
          <img
            src={software.image}
            alt={`${software.name} image`}
            className="img-fluid position-absolute"
          />
          <div className="overlay bg-dark position-absolute" />
          <h1 className="display-4 position-relative text-white">
            {software.name}
          </h1>
        </div>
        <div className="container py-5">
          <div className="row">
            <div className="col-sm-12 col-lg-3">
              <ul className="list-group">
                <h5 className="mb-2">attributes</h5>
                {attributes}
              </ul>
            </div>
            <div className="col-sm-12 col-lg-7">
              <h5 className="mb-2">Preparation Instructions</h5>
              <div
                dangerouslySetInnerHTML={{
                  __html: `${softwareAttributes}`
                }}
              />
            </div>
            <div className="col-sm-12 col-lg-2">
              <button type="button" className="btn btn-danger">
                Delete software
              </button>
            </div>
          </div>
          <Link to="/softwares" className="btn btn-link">
            Back to softwares
          </Link>
        </div>
      </div>
    );
  }
}

export default Software;
