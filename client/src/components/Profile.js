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
import { getChild } from '../actions/children'

class Profile extends Component {

  componentDidMount() {
    this.props.dispatch(getChild());
  }

  onDrop = (photos) => {
    this.props.dispatch(handleUpload(photos[0]));
  }

  render() {

    const age = this.props.children.map( child => {
      return (
        child.age
      )
    })

    const interests = this.props.children.map( child => {
      return (
        child.realInterest.map (int => {
          return (
            <ul>
              <li>
                {int}
              </li>
            </ul>
          )
        })
      )
    })

    const child = this.props.children.map( child => {
      return (
        <Segment>
          <Card>
            <Card.Content>
              <Card.Header>
                Child:
              </Card.Header>
              <Card.Description>
                Age: {age}
              </Card.Description>
              <Divider />
              <Card.Description>
                Interests: {interests}
              </Card.Description>
            </Card.Content>
            <Button primary>Edit</Button>
          </Card>
        </Segment>
      )
    })

    const parent =
        <Segment compact>
          <Card>
            <Card.Content>
              <Card.Header>
                Parent: {this.props.user.name}
              </Card.Header>
              <Card.Description>
                Email: {this.props.user.email}
              </Card.Description>
              <Divider />
              <Card.Description>
                ZipCode: {this.props.user.zipcode}
              </Card.Description>
            </Card.Content>
            <Button primary>Edit</Button>
          </Card>
        </Segment>

    const images = this.props.user.image_url.map( image => {
      return(
        <Segment basic className='actualPhoto'>
          <Image className='litPhoto' src={image} fluid />
            <Modal className='photoMod' trigger={<Button className='enlarge' inverted>Enlarge Picture</Button>}>
            <Modal.Content image>
              <Image className='bigPic' src={image} />
            </Modal.Content>
          </Modal>
        </Segment>
      )
    })

    return(
      <div>
        <Container>
          <Header as='h1'>Welcome To Your Profile, { this.props.user.name }!</Header>
            <Segment.Group horizontal compact className='info'>
              {parent}
              {child}
            </Segment.Group>
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
