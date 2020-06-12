import React from 'react';
import PropTypes from 'prop-types';

class Alert extends React.Component {

  alertClass (type) {
    let classes = {
      error: 'alert-danger',
      alert: 'alert-warning',
      notice: 'alert-info',
      success: 'alert-success'
    };
    return classes[type] || classes.success;
  }

  render() {
    const alertClassName = `alert ${ this.alertClass(this.props.type) }`;

    return(
      <div className={ alertClassName }>
        { this.props.children }
      </div>
    );
  }
}

Alert.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string
};

Alert.defaultProps = {
  type: 'error'
}

export default Alert;
