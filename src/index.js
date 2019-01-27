import React from "react";
import { render } from "react-dom";
import Gallery from "react-photo-gallery";
import SelectedImage from "./SelectedImage";

const speakers = [
  'Peter',
  'Tony',
  'John',
  'Unknow/NA'
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
    this.speakers = speakers;
    this.selectPhoto = this.selectPhoto.bind(this);
    this.Next = this.Next.bind(this);
  }
  selectPhoto(event, obj) {
    let photos = this.state.photos;
    photos[obj.index].selected = !photos[obj.index].selected;
    let selected_photos = this.state.selected_photos;
    if(photos[obj.index].selected) {
      selected_photos.push(obj.photo);
    }
    else {
      selected_photos.pop(obj.photo);
    }
    this.setState({ selected_photos: selected_photos });
  }
  toggleSelect() {
    let photos = this.state.photos.map((photo, index) => {
      return { ...photo, selected: !this.state.selectAll };
    });
    this.setState({ photos: photos, selectAll: !this.state.selectAll });
  }
  Next() {
    this.setState({ currentSpeakerId: this.state.currentSpeakerId + 1 })
    if(this.state.currentSpeakerId == 3) {
      this.setState({button: 'Complete'})
      this.setState({label: ''})
    }
  }
  render() {
    return (
      <div>
        <p>
          <p></p>
          <h1>{this.speakers[this.state.currentSpeakerId]}</h1>
          <button className="toggle-select" onClick={this.Next}>
            {this.state.button}
          </button>
        </p>
        <Gallery
          photos={this.state.selected_photos}
          columns="12"
        />
        <Gallery
          photos={this.state.photos}
          onClick={this.selectPhoto}
          ImageComponent={SelectedImage}
          direction={"column"}
          columns="8"
        />
      </div>
    );
  }
}
render(<App />, document.getElementById("app"));
