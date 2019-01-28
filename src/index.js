import React from "react";
import { render } from "react-dom";
import Gallery from "react-photo-gallery";
import ImageGallery from "./ImageGallery";
import SelectedImage from "./SelectedImage";
import SpeakerName from "./SpeakerName";

const speakers = [
  { name: 'Peter', visible: false },
  { name: 'Tony', visible: false },
  { name: 'John', visible: false },
  { name: 'Unknow/NA', visible: false },
  { name: '', visible: false },
];
const photo_sources = [
  { src: process.env.PUBLIC_URL + '/images/Unknown0_127.jpg', width: 1, height: 1 },
  { src: process.env.PUBLIC_URL + '/images/Unknown0_280.jpg', width: 1, height: 1 },
  { src: process.env.PUBLIC_URL + '/images/Unknown0_620.jpg', width: 1, height: 1 },
  { src: process.env.PUBLIC_URL + '/images/Unknown0_721.jpg', width: 1, height: 1 },
  { src: process.env.PUBLIC_URL + '/images/Unknown0_783.jpg', width: 1, height: 1 },
  { src: process.env.PUBLIC_URL + '/images/Unknown0_790.jpg', width: 1, height: 1 },
  { src: process.env.PUBLIC_URL + '/images/Unknown0_871.jpg', width: 1, height: 1 },
  { src: process.env.PUBLIC_URL + '/images/Unknown0_873.jpg', width: 1, height: 1 },
  { src: process.env.PUBLIC_URL + '/images/Unknown0_875.jpg', width: 1, height: 1 },
  { src: process.env.PUBLIC_URL + '/images/Unknown0_886.jpg', width: 1, height: 1 },
  { src: process.env.PUBLIC_URL + '/images/Unknown0_928.jpg', width: 1, height: 1 },
  { src: process.env.PUBLIC_URL + '/images/Unknown0_933.jpg', width: 1, height: 1 },
  { src: process.env.PUBLIC_URL + '/images/Unknown0_945.jpg', width: 1, height: 1 },
  { src: process.env.PUBLIC_URL + '/images/Unknown0_946.jpg', width: 1, height: 1 },
];
const photos = photo_sources;
const selected_photos = [];
const getIndex = (array, obj) => {
  for(var i = 0; i < array.length; i++) {
    if(array[i].src == obj.src) return i;
  }
  return -1;
}
const shown = {
  display: "block"
};

const hidden = {
  display: "none"
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: photos,
      selected_photos: [[], [], [], []],
      currentSpeakerId: 0, 
      button: 'Next', 
      label:'select all images with' 
    };
    this.pre_selected_photos = [[], [], [], []];
    this.speakers = speakers;
    this.selectPhoto = this.selectPhoto.bind(this);
    this.RemoveSelected = this.RemoveSelected.bind(this);
    this.Next = this.Next.bind(this);
  }
  
  selectPhoto(event, obj) {
    if(this.state.currentSpeakerId == 4) return;
    let photos = this.state.photos;
    this.pre_selected_photos = JSON.parse(JSON.stringify(this.pre_selected_photos));
    photos[obj.index].selected = !photos[obj.index].selected;
    if(photos[obj.index].selected) {
      obj.photo.speaker = this.speakers[this.state.currentSpeakerId];
      this.pre_selected_photos[this.state.currentSpeakerId].push(obj.photo);
    }
    else {
      this.pre_selected_photos[this.state.currentSpeakerId].splice(getIndex(this.pre_selected_photos[this.state.currentSpeakerId], obj.photo), 1);
    }    
    this.setState({ photos: photos });
  }
  Next() {
    if (this.state.currentSpeakerId == 3) {
      this.state.button = 'Complete';
      this.state.label = '';
    }
    else if (this.state.button == "Complete") {
      alert('completed!');
    }
    this.speakers[this.state.currentSpeakerId].visible = true;

    let newState = JSON.parse(JSON.stringify(this.state));
    
    if(this.state.currentSpeakerId < 4) {
      newState.selected_photos[newState.currentSpeakerId] = this.pre_selected_photos[newState.currentSpeakerId]
      newState.currentSpeakerId = this.state.currentSpeakerId + 1;
    }
    
    let pre_photos = [];
    photo_sources.map((photo) => {
      let exist = false;
      newState.selected_photos.map((speakerPhotos) => {
        if(!exist && getIndex(speakerPhotos, photo) >= 0) {
          exist = true;
          return;
        }
      });
      if(!exist) {
        photo.selected = false;
        pre_photos.push(photo);
      }
      
    });
    newState.photos = pre_photos;

    this.setState(newState);    
  }
  RemoveSelected(event, obj) {
    console.log('removed');
    let selected_photos = this.state.selected_photos;
    selected_photos.map((speakerPhotos) => {
      let index = getIndex(speakerPhotos, obj.photo);
      if(index >= 0) speakerPhotos.splice(index, 1);
    });
    this.setState({selected_photos: selected_photos});
  }
  
  render() {
    
    return (
      <div
        style = {
          { textAlign: "center"}
        }
      >
        <SpeakerName speaker={this.speakers[0]} />
        <Gallery
          photos={this.state.selected_photos[0]}
          columns="12"
          ImageComponent={SelectedImage}
          onClick={this.RemoveSelected}
        />
        <SpeakerName speaker={this.speakers[1]} />
        <Gallery
          photos={this.state.selected_photos[1]}
          columns="12"
          ImageComponent={SelectedImage}
          onClick={this.RemoveSelected}
        />
        <SpeakerName speaker={this.speakers[2]} />
        <Gallery
          photos={this.state.selected_photos[2]}
          columns="12"
          ImageComponent={SelectedImage}
          onClick={this.RemoveSelected}
        />
        <SpeakerName speaker={this.speakers[3]} />
        <Gallery
          photos={this.state.selected_photos[3]}
          columns="12"
          ImageComponent={SelectedImage}
          onClick={this.RemoveSelected}
        />
        <p>
          <p>{this.state.label}</p>
          <h1>{this.speakers[this.state.currentSpeakerId].name}</h1>
          <button style={{backgroundColor: "#72d4a9", padding: "10px 40px", color: "white", fontSize:"22px", fontWeight: "bold", outline: "none"}} onClick={this.Next}>
            {this.state.button}
          </button>
        </p>
        
        <Gallery
          photos={this.state.photos}
          onClick={this.selectPhoto}
          ImageComponent={ImageGallery}
          direction={"column"}
          columns="8"
        />
      </div>
    );
  }
}
render(<App />, document.getElementById("app"));
