import React, { Component } from 'react';
import { Header, Segment, Icon, Button, Divider, Container, Image, Card } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import { Link } from 'react-router-dom';
import { handleUpload } from '../actions/photos';
import { connect } from 'react-redux';
import avatar from '../photodump/avatar1.jpg';
import '../styles/profile.css';

class Profile extends Component {

  onDrop = (photos) => {
    this.props.dispatch(handleUpload(photos[0]));
  }

  displayPhotos = () => {
      return(
        <Segment>
          <Image src={this.props.user.image_url} fluid />
        </Segment>
      );
  }

  render() {
    return(
      <div className='bigBox'>
        <Header as='h1' textAlign='center'>
        Welcome To Your Profile!
        </Header>
          <Container className='profContainer'>
            <Segment compact className='avatar'>
              <Image src={avatar} />
              <Divider />
              <div className='username'>
                Your Name Here
              </div>
            </Segment>
            <Segment className='child'>
              Content Here!
            </Segment>
            <div>
              <Dropzone
                onDrop={ this.onDrop }
                style={{ width: '100%', height: '100px', border: '1px dashed black'}}
              >
                <Header as='h4'>Try dropping some files or clicking here to upload!</Header>
              </Dropzone>
              <Segment basic>
                <Header as='h2'>Family Photos!</Header>
                <Divider />
                <div className='photos'>
                  { this.displayPhotos() }
                </div>
              </Segment>
            </div>
          </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.user };
}

export default connect(mapStateToProps)(Profile);
