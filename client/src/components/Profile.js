import React, { Component } from 'react';
import { Header,
         Segment,
         Button,
         Divider,
         Container,
         Image,
         Card,
         Modal,
        } from 'semantic-ui-react';
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

  render() {

    const { children, name } = this.props.user;
    const { age } = this.props.children;

    const images = this.props.user.image_url.map( image => {
      return(
        <Segment basic className='actualPhoto'>
          <Image src={image} fluid />
          <Modal trigger={<Button>Enlarge Picture</Button>}>
          <Modal.Header>Your Picture</Modal.Header>
            <Modal.Content image>
              <Image src={image} fluid />
              <Modal.Description>
                <Header>Default Profile Image</Header>
                <p>We have found the following gravatar image associated with your e-mail address.</p>
                <p>Is it okay to use this photo?</p>
              </Modal.Description>
            </Modal.Content>
          </Modal>
        </Segment>
      )
    })

    return(
      <div>
        <Container>
          <Header as='h1'>Welcome To Your Profile, {name}!</Header>
          <Header as='h1'>Your Childs Age:</Header>
          <Dropzone
            onDrop={ this.onDrop }
            style={{ width: '100%', height: '100px', border: '1px dashed black'}}
          >
            <Header as='h4'>Try dropping some files or clicking here to upload!</Header>
          </Dropzone>
          <Segment basic>
            <Header as='h2'>Family Photos!</Header>
            <Divider />
            <Segment.Group horizontal compact className='photos'>
              { images }
            </Segment.Group>
          </Segment>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.user, children: state.children };
}

export default connect(mapStateToProps)(Profile);
