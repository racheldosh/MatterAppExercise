import React from 'react';
import axios from 'axios';
import TeamMember from '../TeamMember';
import Form from '../Form';
import Arrow from '../../assets/arrow.png';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      team: [],
      loading: true,
      showForm: false
    };
  }

  async componentDidMount() {
    try {
      await this.fetchInitialData();
    } catch (error) {
      // try again after half a second if fails due to race condition
      console.log('retrying initial data request...');
      setTimeout(async () => {
        await this.fetchInitialData();
      }, 500);
    }
  }

  async fetchInitialData() {
    const response = await axios.get('/team');
    this.setState({
      team: response.data,
      loading: false
    });
  }

  toggleForm(val) {
    this.setState({showForm: val});
  }

  render() {
    if (this.state.loading) {
      return <h1>Loading...</h1>;
    }

    var contents;

    if (this.state.showForm) {
      contents = (
        <div>
          <div className="nav-bar" >
            <nav onClick={this.toggleForm.bind(this, false)}>
              <p> Go Back </p>
            </nav>
          </div>
          <Form />
        </div>);
    } else {
      contents = (
        <div>
          <div className="team-grid" />
          {this.state.team.map(member => (
            <TeamMember
              key={member.id}
              name={`${member.firstName} ${member.lastName}`}
              title={member.title}
              photoUrl={member.photoUrl}
              story={member.story}
              favoriteColor={member.favoriteColor}
            />
          ))}
          <TeamMember id="new" name="Join us!" title="New Teammate" customClickEvent={this.toggleForm.bind(this, true)}/>
        </div>
      );
    }

    return(
      <div className="app">
        {contents} 
      </div>
    );
  }
}

export default App;
