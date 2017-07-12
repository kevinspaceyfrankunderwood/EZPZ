import React from 'react'
import { Header, Segment, Button, Divider, Label, Container, Grid, Card, Dropdown } from 'semantic-ui-react'
// import DatePicker from 'react-datepicker';
// import moment from 'moment';
// import 'react-datepicker/dist/react-datepicker.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getActivities } from '../actions/activities'
import ActivityView from './ActivityView'


class Activities extends React.Component {

  state = { month: '', activeIndex: 0, visible: [] }

  componentWillMount() {
    this.props.dispatch(getActivities(this.setActivities));
  }

  setActivities = (activities) => {
    this.setState({ visible: activities });
  }

  tick =() => {
    let activeIndex = this.state.activeIndex;
    console.log(this.state.activeIndex, this.state.visible.length)
    if (activeIndex == this.state.visible.length - 1){
      activeIndex = 0
    } else {
      activeIndex++;
    }
    this.setState({ activeIndex });
  }

  monthOptions = () => {
    let { months } = this.props;
    return months.map( (month, index) => { return { key: index, text: month, value: month}})
  }

  updateFilter = (e, data) => {
    let visible = this.props.activities.filter( a => a.date === data.value)
    this.setState({ month: data.value, visible, activeIndex: 0 });
  }



  render() {
    let { month } = this.state;
    if (month == '')
      return(
        <Container>
          <Dropdown
          placeholder="Select Month to Play"
          fluid
          selection
          options={this.monthOptions()}
          onChange={this.updateFilter}
          value={month}
          />
          { month &&
              <Button
                fluid
                basic
                onClick={ () => this.setState({ month: '' }) }
              >
              Clear Filter: {month}
              </Button>
            }
          </Container>
        )
    else
      return(
        <Container>
          <Header as='h3' textAlign="center">Activities</Header>
          <Dropdown
            placeholder="Select Month to Play"
            fluid
            selection
            options={this.monthOptions()}
            onChange={this.updateFilter}
            value={month}
            />
            { month &&
                <Button
                  fluid
                  basic
                  onClick={ () => this.setState({ month: '' }) }
                >
                Clear Filter: {month}
                </Button>
                }
                <Divider />
            <Grid columns={16}>
              <Grid.Row>
                <ActivityView activity={this.state.visible[this.state.activeIndex]} />
              </Grid.Row>
            </Grid>
            <div className='ui two buttons'>
              <Button className = "btn btn-default" onClick={this.tick} >
                Show Next Activity
              </Button>
              <Button basic color='green'>Approve</Button>
            </div>
        </Container>
      )
  }
}

const mapStateToProps = (state) => {
  const activities = state.activities;
  const months = [...new Set(state.activities.map( a => a.date ))]
  return { activities, months }
}

export default connect(mapStateToProps)(Activities);
