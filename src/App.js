import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

import Particles from 'react-particles-js';

// const particlesOptions = {
//   particles: {
//     number: {
//       value: 30,
//       density: {
//         enable: true,
//         value_area: 800
//       }
//     }
//   }
// }

const particlesOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    },
    line_linked: {
      shadow: {
        enable: true,
        color: "#ffffff",
        blur: 5,
        width: 1
      }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "repulse"
      },
      onclick: {
        enable: true,
        mode: "push"
      }
      // resize: true
    }
    
  }
}

const initialState = {
  input: ' ',
  imageUrl: ' ',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user:{
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      input: ' ',
      imageUrl: ' ',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user:{
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({user:{
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const face = data.outputs[0].data.regions[0].region_info.bounding_box;
    const img = document.getElementById('inputImage');
    const width = Number(img.width);
    const height = Number(img.height);
    console.log(width, height);
    return {
      leftCol: face.left_col * width,
      rightCol: width - face.right_col * width,
      topRow: face.top_row * height,
      bottomRow: height - face.bottom_row * height
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    console.log(event.target.value);
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    console.log('click');
    this.setState({imageUrl: this.state.input});
      fetch('https://safe-chamber-28409.herokuapp.com/imageurl', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://safe-chamber-28409.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count =>{
            this.setState(Object.assign(this.state.user, {entries:count}))
          })
          .catch(console.log);
        }
        console.log(response);
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch(err=>console.log(err));
  }

  onRouteChange = (route) => {

    if (route === "signout") {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({isSignedIn: true});
    }

    this.setState({route: route});

  }

  render() {
    const {isSignedIn, imageUrl, route, box} = this.state;
    return (
      <div className="App pb7 mb5">
        <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
        { route === 'home'
          ? <div>
              <Logo />
              <Rank 
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onButtonSubmit={this.onButtonSubmit} 
              />
              <FaceRecognition box={box} imageUrl={imageUrl}/>
            </div>  
          : (
              route === 'signin' 
              ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            )
              
        }

      </div>
    );
  }
}

export default App;
