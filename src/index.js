import React from "react";
import { render } from "react-dom";
import Gallery from "react-photo-gallery";
import ImageGallery from "./ImageGallery";
import SelectedImage from "./SelectedImage";

const speakers = [
  'Peter',
  'Tony',
  'John',
  'Unknow/NA',
  ''
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
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: photos,
      selected_photos: selected_photos,
      currentSpeakerId: 0, 
      button: 'Next', 
      label:'select all images with' 
    };
    this.pre_selected_photos = [];
    this.speakers = speakers;
    this.selectPhoto = this.selectPhoto.bind(this);
    this.RemoveSelected = this.RemoveSelected.bind(this);
    this.Next = this.Next.bind(this);
  }
  
  selectPhoto(event, obj) {
    let photos = this.state.photos;
    
    this.pre_selected_photos = JSON.parse(JSON.stringify(this.pre_selected_photos));
    photos[obj.index].selected = !photos[obj.index].selected;
    if(photos[obj.index].selected) {
      obj.photo.speaker = this.speakers[this.state.currentSpeakerId];
      this.pre_selected_photos.push(obj.photo);
    }
    else {
      this.pre_selected_photos.splice(getIndex(this.pre_selected_photos, obj.photo), 1);
    }    
    this.setState({ photos: photos });
  }
  toggleSelect() {
    let photos = this.state.photos.map((photo, index) => {
      return { ...photo, selected: !this.state.selectAll };
    });
    this.setState({ photos: photos, selectAll: !this.state.selectAll });
  }
  Next() {
    this.setState({ selected_photos: this.pre_selected_photos });    
    
    // if (this.state.currentSpeakerId < 3) {
      this.setState({ currentSpeakerId: this.state.currentSpeakerId + 1 })
    // }
    if (this.state.currentSpeakerId == 3) {
      this.setState({button: 'Complete'})
      this.setState({label: ''})
    }
    if (this.state.button == "Complete") {
      alert('completed!');
    }
    
    let pre_photos = [];
    photo_sources.map((photo) => {
      if(getIndex(this.pre_selected_photos, photo) == -1) {
        photo.selected = false;
        pre_photos.push(photo);
      }
    });
    this.setState({photos: pre_photos});
    
  }
  RemoveSelected(event, obj) {
    
    let selected_photos = this.state.selected_photos;
    console.log(obj.photo);
    selected_photos.splice(getIndex(selected_photos, obj.photo), 1);
    this.setState({selected_photos: selected_photos});
  }
  render() {
    return (
      <div
        style = {
          { textAlign: "center"}
        }
      >
        <Gallery
          photos={this.state.selected_photos}
          columns="12"
          ImageComponent={SelectedImage}
          onClick={this.RemoveSelected}
        />
        <p>
          <p>{this.state.label}</p>
          <h1>{this.speakers[this.state.currentSpeakerId]}</h1>
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
