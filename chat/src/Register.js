import React from "react";

export default class Registered extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
                    email: '',
                    error: false
                };
  
      // This binding is necessary to make `this` work in the callback
      this.handleBlur = this.handleBlur.bind(this);
    }
  
    handleBlur(e) {
      const email = e.target.value;
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (emailRegex.test(email)) { 
        this.setState({
            email: email,
            error: false
        });
      } else {
        this.setState({
            error: true,
            email: ''
        });
      }
    }
  
    render() {
      return (
        <>
        <input onBlur={(e) => this.handleBlur(e)}></input>
        {this.state.error && <span>Please eneter valid email</span>}
        </>
      );
    }
  }