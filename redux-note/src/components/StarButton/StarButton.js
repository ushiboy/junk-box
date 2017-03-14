/* @flow */
import React from 'react';
import Button from '../Button/Button';

export default class StarButton extends React.Component {

  renderStar() {
    return (
      <Button onClick={this.props.onChange.bind(this)}>
        <span>Star</span>
        <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
      </Button>
    );
  }

  renderUnstar() {
    return (
      <Button onClick={this.props.onChange.bind(this)}>
        <span>Unstar</span>
        <span className="glyphicon glyphicon-star-empty" aria-hidden="true"></span>
      </Button>
    );
  }

  render() {
    const { starred } = this.props;
    return (
      <span className="Star">
        {starred ? this.renderUnstar() : this.renderStar()}
      </span>
    );
  }

}
