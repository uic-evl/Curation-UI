/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable max-len */
import React, { Component } from 'react';
import {
  Grid,
  Cell,
  SelectField,
  TextField,
  Paper,
  Divider,
  Button,
  DataTable,
  TableHeader,
  TableRow,
  TableColumn,
  TableBody,
} from 'react-md';
import { connect } from 'react-redux';

import SubfigureCarrousel from './subfigure_carousel';

class SubfigureDetails2 extends Component {
  render() {
    const style = {
      'height': '300px',
      'width': '100%',
    };

    const { subfigure, modalities } = this.props;
    return (
      <div>
        <SubfigureCarrousel />

        <Paper zDepth="5">
          <Grid>
            <Cell size={5}>
              <div>
                <img
                  src={`/dist/images/subfigures/${subfigure.id}`}
                  alt="random"
                  style={style}
                />
              </div>
              <div>
                <p>
                  {subfigure.caption}
                </p>
              </div>
            </Cell>
            <Cell size={4}>
              <DataTable plain selectable={false}>
                <TableHeader>
                  <TableRow>
                    <TableColumn>Textual Context</TableColumn>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow key={1}>
                    <TableColumn>Maecenas in mi malesuada, dignissim dolor et, varius urna. Morbi ut augue metus. Fusce leo lorem, facilisis vel metus iaculis, tempus faucibus lectus. Maecenas nec tortor in purus scelerisque commodo sed eget eros. Etiam iaculis quis lorem sit amet porta. Sed facilisis odio vel odio tincidunt posuere. Sed pharetra tortor nec nibh porta interdum. Vivamus ac diam sed urna mattis imperdiet eget sit amet lacus. Mauris congue magna at nisl convallis cursus.</TableColumn>
                  </TableRow>
                  <TableRow key={2}>
                    <TableColumn>
                    Quisque vel erat sit amet purus tempus pharetra. Nullam scelerisque semper sem, a iaculis sem sollicitudin malesuada. Donec vel interdum libero. Donec tortor enim, lacinia ut lacinia nec, sollicitudin vitae lectus. Etiam finibus pharetra massa, id mollis tortor elementum vel. Vestibulum ante felis, cursus nec malesuada vel, posuere ac velit. Cras pretium, turpis quis varius mollis, tellus libero facilisis risus, eu ullamcorper massa ligula at nisl. Praesent eu urna quis eros cursus dignissim. Curabitur ex magna, vestibulum quis nisi in, placerat convallis ex.
                    </TableColumn>
                  </TableRow>
                </TableBody>
              </DataTable>
            </Cell>
            <Cell size={3}>
              <SelectField
                id="modality-select-field"
                label="Modality"
                className="md-cell"
                menuItems={modalities}
              />
              <TextField
                id="subfigure_comments"
                label="Comments"
                rows={4}
                maxRows={4}
                className="md-cell md-cell--12"
              />
              <Button flat primary swapTheming>Save</Button>
            </Cell>
          </Grid>
          <Divider />
        </Paper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  if (!state.selectedFigureData) {
    return {
      subfigure: {
        id: 'sample.png',
      },
      modalities: state.modalities,
    };
  }

  return {
    subfigure: state.selectedFigureData.selectedSubfigure,
    modalities: state.modalities,
  };
}

export default connect(mapStateToProps, null)(SubfigureDetails2);
