import React from 'react';
import axios from 'axios';
import './Form.css';
import MatterEmptyAvatar from '../../assets/matter_empty_avatar.svg';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName : "",
      lastName : "",
      title : "",
      story : "",
      favColor : "", 
      photoUrl : ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  validateRequestData() {
      // validate the color, show default color if not hex color
      const isColorOk  = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(this.state.favColor)
      const requestColor = isColorOk ? this.state.favColor : '#3466F2';

      // validate the photo url, show default if not JPEG, JPG, GIF, PNG
      const isPhotoOk = this.state.photoUrl.match(/\.(jpeg|jpg|gif|png)$/);
      const requestPhotoUrl = (isPhotoOk != null) ? this.state.photoUrl : MatterEmptyAvatar;

      const str = {
        "firstName":this.state.firstName,
        "lastName":this.state.lastName,
        title:this.state.title,
        favoriteColor: requestColor,
        photoUrl: requestPhotoUrl,
        story:this.state.story};

      return str;
  }

  async onSubmit(event) {
    const requestData = this.validateRequestData();
      
    try {
      await axios.post('/team', requestData);
    } catch (error) {
      // try again after half a second if fails 
      console.log('retrying data post...');
      setTimeout(async () => {
        await axios.post('/team', requestData);
      }, 500);
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div className="form-container">
        <h3> Please fill out your information to join the team </h3>
        <form onSubmit={this.onSubmit}>
          <label>
            First Name:
            <input type="text" name="firstName" onChange={this.handleInputChange}/>
          </label> 
          <label>
            Last Name:
            <input type="text" name="lastName" onChange={this.handleInputChange}/>
          </label>
          <label>
            Title:
            <input type="text" name="title" onChange={this.handleInputChange}/>
          </label>
          <label>
            Story:
            <textarea type="text" name="story" placeholder="E.g. Where has feedback made the largest impact on your career?" onChange={this.handleInputChange}/>
          </label>
          <label>
            Favorite Color:
            <input type="text" name="favColor" placeholder="#ffffff" onChange={this.handleInputChange}/>
          </label>
          <label>
            Photo url:
            <input type="text" name="photoUrl" onChange={this.handleInputChange}/>
          </label>
          <div className="buttons">
            <input type="submit" value="Join"/>
            <input type="reset" value="Clear"/>
          </div>
        </form>
      </div>
    );
  }
}

export default Form;
