import React from 'react';

class divinput extends React.Component<any, any> {
  render() {
    return (
      <div className="form-group">
        <label htmlFor={this.props.name}>{this.props.name}</label>
        <input
          type="text"
          className="form-control"
          name={this.props.name}
          ref={this.props.node}
          placeholder={this.props.name}
          defaultValue={this.props.defaultvalue}
        />
      </div>
    );
  }
}
export default divinput;
