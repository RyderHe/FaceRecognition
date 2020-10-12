import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

import Particles from 'react-particles-js';

import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: 'de5e55fab0e9457d8f727cdd6027d3f0'
});


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

class App extends Component {

  constructor() {
    super();
    this.state = {
      input: ' ',
      imageUrl: ' ',
      box: {}
    }
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
    this.setState({imageUrl: this.state.input})
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => {
        console.log(response);
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch(err=>console.log(err));
  }

  render() {
    return (
      <div className="App pb7 mb5">
        <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit} 
        />
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>

      </div>
    );
  }
}

export default App;
