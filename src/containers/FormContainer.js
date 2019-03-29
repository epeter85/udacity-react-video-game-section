import React, { Component } from "react";

/* Import Components */
import Input from "../components/Input";
import Button from "../components/Button";

class FormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newPlayer: {
        firstName: "",
        lastName: "",
        userName: "",
        games: 0
      }
    };
    
    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  /* This lifecycle hook gets executed when the component mounts */

  handleFirstName(e) {
    let value = e.target.value;
    this.setState(
      prevState => ({
        newPlayer: {
          ...prevState.newPlayer,
          firstName: value
        }
      }),
      () => console.log(this.state.newPlayer)
    );
  }

  handleInput(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState(
      prevState => ({
        newPlayer: {
          ...prevState.newPlayer,
          [name]: value
        }
      }),
      () => console.log(this.state.newPlayer)
    );
  }

  handleFormSubmit(e) {
    e.preventDefault();
    let userData = this.state.newPlayer;

    fetch("http://example.com", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => {
      response.json().then(data => {
        console.log("Successful" + data);
      });
    });
  }

  handleClearForm(e) {
    e.preventDefault();
    this.setState({
      newPlayer: {
        firstName: "",
        lastName: "",
        userName: "",
        games: 0
      }
    });
  }

  render() {
    return (
      <form className="container-fluid" onSubmit={this.handleFormSubmit}>
        <Input
          title={"First Name"}
          name={"firstName"}
          value={this.state.newPlayer.firstName}
          placeholder={"Enter your first name"}
          onChange={this.handleInput}
        />{" "}
        {/* First Name of the user */}
        <Input
          title={"Last Name"}
          name={"lastName"}
          value={this.state.newPlayer.lastName}
          placeholder={"Enter your last name"}
          onChange={this.handleInput}
        />{" "}
        {/* Last Name of the user */}
        <Input
          title={"User Name"}
          name={"userName"}
          value={this.state.newPlayer.userName}
          placeholder={"Enter a user name"}
          onChange={this.handleInput}
        />{" "}
        {/* User Name of the user */}
        <Button
          action={this.handleFormSubmit}
          type={"primary"}
          title={"Add User"}
          style={buttonStyle}
        />{" "}
        {/*Submit */}
        <Button
          action={this.handleClearForm}
          type={"secondary"}
          title={"Clear"}
          style={buttonStyle}
        />{" "}
        {/* Clear the form */}
      </form>
    );
  }
}

const buttonStyle = {
  margin: "10px 10px 10px 10px"
};

export default FormContainer;
