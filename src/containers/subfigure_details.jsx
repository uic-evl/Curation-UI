/* eslint-disable */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { FontIcon, List, ListItem, Paper, Card, CardTitle, Media, CardText, Divider, SelectField, TextField } from 'react-md';
import { connect } from 'react-redux';
import QuickNav from '../components/quick_nav';

class SubfigureDetails extends Component {

  render() {
    const links = [{
      label: 'previous',
      icon: <FontIcon>navigate_before</FontIcon>,
    }, {
      label: 'next',
      icon: <FontIcon>navigate_next</FontIcon>,
    },
    ];

    const style = {
      'height': '60vh',
    };

    return (
      <div className="md-grid md-grid--no-spacing" style={style} >
        <Card className="md-cell md-cell--12 md-cell--12-tablet">
          <CardTitle title="Subfigure 1" subtitle="1/3" />
          <Media>
            <img src="/dist/images/001.jpg" alt="random" />
          </Media>
          <CardText>
            <p>(A) Crystal structures of the Smad2/Smad4 (left) and Smad3/Smad4 (right) complexes. The Smad2 subunits are in red. The Smad3 subunits are in green. The Smad4 subunits in both complexes are in cyan. The L3 loops are in yellow. The phosphoserine side chains are in stick presentation.</p>
          </CardText>
          <Divider />
          <SelectField
            id="modality-select-field"
            label="Modality"
            className="md-cell"
            menuItems={this.props.modalities}
          />
          <TextField
            id="subfigure_comments"
            label="Comments"
            rows={3}
            maxRows={6}
            className="md-cell md-cell--12"
          />
        </Card>
        <QuickNav />
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    subfigures: state.subfigures,
    modalities: state.modalities,
  };
}

export default connect(mapStateToProps, null)(SubfigureDetails);
