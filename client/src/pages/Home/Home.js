import React, { Component } from "react";
import API from "../../utils/API";
import Header from "../../components/Header";
import Mess from "../../components/Mess";
import { Link } from "react-router-dom";
// import messes from "../../messes.json"

class Home extends Component {
  state = {
    messes: [],
    resolvedMesses: []
  };

  componentDidMount() {
    this.loadMesses();
  };

  loadMesses = () => {
    API.getMesses()
      .then(res => {
        //console.log(res)
        const resolvedMesses = res.data.filter(entry => {
          // console.log("inside filter resolved");
          // console.log("entry ", entry);
          // console.log("entry.resolved ", entry.resolved);
          return entry.resolved;
        });
        //console.log("resolvedMesses ", resolvedMesses);
        const messes = res.data.filter(entry => {
          return !(entry.resolved);
        });
        //console.log("messes ", messes);
        this.setState({
          messes: messes,
          resolvedMesses: resolvedMesses
        });
        // console.log("this.state.messes ", this.state.messes);
        // console.log("this.state.resolvedMesses ", this.state.messes);
      })
      .catch(err => console.log(err));
  };

  loadImage = (mess) => {
    //console.log("inside loadImage mess ", mess);
    let image = {};
    if (mess.resolved) {
      //console.log("inside mess.resolved", mess.resolved);
      image = mess.imageCleaned;
    } else {
      image = mess.imageMess;
    }
    //console.log("image", image);
    if (image) {
      const imageBuffer = image.data;
      const convertStoredImage = imageBuffer.map(part =>
        String.fromCharCode(part));
      const imageString = convertStoredImage.join('');
      return imageString;
    } else {
      return `${window.location.origin}/images/man_in_trash.jpg`
    }
  }

  render() {
    return (
      <div id="homepage">
        <Header />
        <h3 id="headlineMess">Messes, that I have reported:</h3>
        {this.state.messes.map(mess => (
          <Link to={"/clean/" + mess._id}>
            <Mess
              key={mess._id}
              className='messes'
              image={this.loadImage(mess)}
              title={mess.title}
              location={mess.location}
              levelOfConcern={mess.levelOfConcern}
              description={mess.description}
              timestamp={mess.timestampReport}
              sensitive={mess.sensitive}
            />
          </Link>
        ))}
        <br></br>
        <h3 id="headlineCleaned">Messes, I reported, which are cleaned up:</h3>
        {this.state.resolvedMesses.map(resolvedMess => (
          <Mess
            key={resolvedMess._id}
            className='resolvedMess'
            image={this.loadImage(resolvedMess)}
            title={resolvedMess.title}
            location={resolvedMess.location}
            levelOfConcern={resolvedMess.levelOfConcern}
            description={resolvedMess.description}
            timestamp={resolvedMess.timestampReport}
            sensitive={resolvedMess.sensitive}
          />
        ))}
      </div>
    );
  }
}

export default Home;