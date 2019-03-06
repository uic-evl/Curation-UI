/* eslint-disable arrow-body-style */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable */
import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
  SelectFieldColumn,
  Checkbox,
  TextField,
  Grid,
  Cell,
  SelectionControl,
  Toolbar,
  Button,
} from 'react-md';

class SubImageModList extends Component {
  testClick(val) {
    console.log(val);
  }

  renderItems() {
    let { modalities } = this.props;
    modalities = _.orderBy(modalities, ['modality1', 'modality2'], ['asc']);
    return modalities.map((modality) => {
      return (
        <TableRow>
          <TableColumn>{modality.modality1}</TableColumn>
          <TableColumn className="selected-td">{modality.modality2}</TableColumn>
          <TableColumn onClick={() => this.testClick(modality.modality3)}><span>{modality.modality3}</span></TableColumn>
          <TableColumn>{modality.modality4}</TableColumn>
        </TableRow>
      );
    });
  }

  drawBigTable() {
      return (
        <DataTable plain>
          <TableHeader className="selection-table">
            <TableRow>
              <TableColumn plain className="selection-table">Gel</TableColumn>
              <TableColumn plain className="selection-table">Plate</TableColumn>
              <TableColumn plain className="selection-table">Fluorescence</TableColumn>
              <TableColumn plain className="selection-table">Light</TableColumn>
              <TableColumn plain className="selection-table">Electron</TableColumn>
              <TableColumn plain className="selection-table">Graphics</TableColumn>
              <TableColumn plain className="selection-table">Organisms</TableColumn>
              <TableColumn plain className="selection-table">Mol Struc</TableColumn>
              <TableColumn plain className="selection-table">Other</TableColumn>
            </TableRow>
          </TableHeader>
          <TableBody className="selection-table">
            <TableRow>
              <TableColumn plain className="selection-table">Western Blot</TableColumn>
              <TableColumn plain className="selection-table">All</TableColumn>
              <TableColumn plain className="selection-table">EFIC</TableColumn>
              <TableColumn plain className="selection-table">Whole Mount</TableColumn>
              <TableColumn plain className="selection-table">Scanning</TableColumn>
              <TableColumn plain className="selection-table">Bar Chart</TableColumn>
              <TableColumn plain className="selection-table">MRI/CT</TableColumn>
              <TableColumn plain className="selection-table">3D Structure</TableColumn>
              <TableColumn plain className="selection-table">All</TableColumn>
            </TableRow>
            <TableRow>
              <TableColumn plain className="selection-table">Northern Blot</TableColumn>
              <TableColumn />
              <TableColumn plain className="selection-table">Whole Mount</TableColumn>
              <TableColumn plain className="selection-table">InSitu Hyb</TableColumn>
              <TableColumn plain className="selection-table">Transmission</TableColumn>
              <TableColumn plain className="selection-table">Line Chart</TableColumn>
              <TableColumn plain className="selection-table">X-Ray</TableColumn>
              <TableColumn plain className="selection-table">DNA</TableColumn>
              <TableColumn />
            </TableRow>
            <TableRow>
              <TableColumn plain className="selection-table">RT_PCR</TableColumn>
              <TableColumn />
              <TableColumn plain className="selection-table">Reporter Genes & Immunohist</TableColumn>
              <TableColumn plain className="selection-table">Other</TableColumn>
              <TableColumn />
              <TableColumn plain className="selection-table">Diagram</TableColumn>
              <TableColumn plain className="selection-table">Photographs</TableColumn>
              <TableColumn plain className="selection-table">RNA</TableColumn>
              <TableColumn />
            </TableRow>
            <TableRow>
              <TableColumn />
              <TableColumn />
              <TableColumn plain className="selection-table">Other</TableColumn>
              <TableColumn />
              <TableColumn />
              <TableColumn plain className="selection-table">Scatterplot</TableColumn>
              <TableColumn />
              <TableColumn plain className="selection-table">Chemical Structure</TableColumn>
              <TableColumn />
            </TableRow>
            <TableRow>
              <TableColumn />
              <TableColumn />
              <TableColumn />
              <TableColumn />
              <TableColumn />
              <TableColumn plain className="selection-table">Other</TableColumn>
              <TableColumn />
              <TableColumn />
              <TableColumn />
            </TableRow>
          </TableBody>
        </DataTable>
      )
  }

  drawBigTableCheck() {
      return (
        <DataTable plain>
          <TableHeader className="selection-table">
            <TableRow>
              <TableColumn plain className="selection-table">Gel</TableColumn>
              <TableColumn plain className="selection-table">Plate</TableColumn>
              <TableColumn plain className="selection-table">Fluorescence</TableColumn>
              <TableColumn plain className="selection-table">Light</TableColumn>
              <TableColumn plain className="selection-table">Electron</TableColumn>
              <TableColumn plain className="selection-table">Graphics</TableColumn>
              <TableColumn plain className="selection-table">Organisms</TableColumn>
              <TableColumn plain className="selection-table">Mol Struc</TableColumn>
              <TableColumn plain className="selection-table">Other</TableColumn>
            </TableRow>
          </TableHeader>
          <TableBody className="selection-table">
            <TableRow>
              <TableColumn plain className="selection-table">
                <Checkbox
                      id="id1"
                      name="n1"
                      label="Northern"
                      value="Western"
                      className="matrix-checkbox"
                />
              </TableColumn>
              <TableColumn plain className="selection-table">
                <Checkbox
                      id="id1"
                      name="n1"
                      label="Plate"
                      value="Western"
                      className="matrix-checkbox"
                />
              </TableColumn>
              <TableColumn plain className="selection-table">
                <Checkbox
                      id="id1"
                      name="n1"
                      label="EFIC"
                      value="Western"
                      className="matrix-checkbox"
                />
              </TableColumn>
              <TableColumn plain className="selection-table">
                <Checkbox
                      id="id1"
                      name="n1"
                      label="InSitu"
                      value="Western"
                      className="matrix-checkbox"
                />
              </TableColumn>
              <TableColumn plain className="selection-table">
                <Checkbox
                      id="id1"
                      name="n1"
                      label="Scanning"
                      value="Western"
                      className="matrix-checkbox"
                />
              </TableColumn>
              <TableColumn plain className="selection-table">
                <Checkbox
                      id="id1"
                      name="n1"
                      label="Bar Chart"
                      value="Western"
                      className="matrix-checkbox"
                />
              </TableColumn>
              <TableColumn plain className="selection-table">
                <Checkbox
                      id="id1"
                      name="n1"
                      label="MRI/CT"
                      value="Western"
                      className="matrix-checkbox"
                />
              </TableColumn>
              <TableColumn plain className="selection-table">
                <Checkbox
                      id="id1"
                      name="n1"
                      label="3D"
                      value="Western"
                      className="matrix-checkbox"
                />
              </TableColumn>
              <TableColumn plain className="selection-table">
                <Checkbox
                      id="id1"
                      name="n1"
                      label="Other"
                      value="Western"
                      className="matrix-checkbox"
                />
              </TableColumn>
            </TableRow>
            <TableRow>
              <TableColumn plain className="selection-table">
                <Checkbox
                      id="id1"
                      name="n1"
                      label="Western"
                      value="Western"
                      className="matrix-checkbox"
                />
              </TableColumn>
              <TableColumn />
              <TableColumn plain className="selection-table">
                <Checkbox
                      id="id1"
                      name="n1"
                      label="Reporter Genes & Immuno"
                      value="Western"
                      className="matrix-checkbox"
                />
              </TableColumn>
              <TableColumn plain className="selection-table">
                <Checkbox
                      id="id1"
                      name="n1"
                      label="Whole Mount"
                      value="Western"
                      className="matrix-checkbox"
                />
              </TableColumn>
              <TableColumn plain className="selection-table">
                <Checkbox
                      id="id1"
                      name="n1"
                      label="Transmission"
                      value="Western"
                      className="matrix-checkbox"
                />
              </TableColumn>
              <TableColumn plain className="selection-table">
                <Checkbox
                      id="id1"
                      name="n1"
                      label="Diagram"
                      value="Western"
                      className="matrix-checkbox"
                />
              </TableColumn>
              <TableColumn plain className="selection-table">
                <Checkbox
                      id="id1"
                      name="n1"
                      label="Photos"
                      value="Western"
                      className="matrix-checkbox"
                />
              </TableColumn>
              <TableColumn plain className="selection-table">
                <Checkbox
                      id="id1"
                      name="n1"
                      label="Chemical Structure"
                      value="Western"
                      className="matrix-checkbox"
                />
              </TableColumn>
              <TableColumn />
            </TableRow>
            <TableRow>
              <TableColumn plain className="selection-table">
                <Checkbox
                      id="id1"
                      name="n1"
                      label="RT_PCR"
                      value="Western"
                      className="matrix-checkbox"
                />
              </TableColumn>
              <TableColumn />
              <TableColumn plain className="selection-table">
                <Checkbox
                      id="id1"
                      name="n1"
                      label="Whole Mount"
                      value="Western"
                      className="matrix-checkbox"
                />
              </TableColumn>
              <TableColumn plain className="selection-table">
                <Checkbox
                      id="id1"
                      name="n1"
                      label="Other Light"
                      value="Western"
                      className="matrix-checkbox"
                />
              </TableColumn>
              <TableColumn />
              <TableColumn plain className="selection-table">
                <Checkbox
                      id="id1"
                      name="n1"
                      label="Line Chart"
                      value="Western"
                      className="matrix-checkbox"
                />
              </TableColumn>
              <TableColumn plain className="selection-table">
                <Checkbox
                      id="id1"
                      name="n1"
                      label="X-Ray"
                      value="Western"
                      className="matrix-checkbox"
                />
              </TableColumn>
              <TableColumn plain className="selection-table">
                <Checkbox
                      id="id1"
                      name="n1"
                      label="DNA"
                      value="Western"
                      className="matrix-checkbox"
                />
              </TableColumn>
              <TableColumn />
            </TableRow>
            <TableRow>
              <TableColumn />
              <TableColumn />
              <TableColumn plain className="selection-table">
                <Checkbox
                      id="id1"
                      name="n1"
                      label="Other Fluo."
                      value="Western"
                      className="matrix-checkbox"
                />
              </TableColumn>
              <TableColumn />
              <TableColumn />
              <TableColumn plain className="selection-table">
                <Checkbox
                      id="id1"
                      name="n1"
                      label="Scatterplot"
                      value="Western"
                      className="matrix-checkbox"
                />
              </TableColumn>
              <TableColumn />
              <TableColumn plain className="selection-table">
                <Checkbox
                      id="id1"
                      name="n1"
                      label="RNA"
                      value="Western"
                      className="matrix-checkbox"
                />
              </TableColumn>
              <TableColumn />
            </TableRow>
            <TableRow>
              <TableColumn />
              <TableColumn />
              <TableColumn />
              <TableColumn />
              <TableColumn />
              <TableColumn plain className="selection-table">
                <Checkbox
                      id="id1"
                      name="n1"
                      label="Other Graphic"
                      value="Western"
                      className="matrix-checkbox"
                />
              </TableColumn>
              <TableColumn />
              <TableColumn />
              <TableColumn />
            </TableRow>
          </TableBody>
        </DataTable>
      )
  }

  drawReducedTable() {
    return (
      <DataTable plain>
        <TableHeader className="selection-table">
          <TableRow>
            <TableColumn plain>Gel</TableColumn>
            <TableColumn plain>Plate</TableColumn>
            <TableColumn plain>Fluo</TableColumn>
            <TableColumn plain>Light</TableColumn>
            <TableColumn plain>Electron</TableColumn>
            <TableColumn plain>Graphics</TableColumn>
            <TableColumn plain>Organisms</TableColumn>
            <TableColumn plain>Mol Struc</TableColumn>
            <TableColumn plain>Other</TableColumn>
          </TableRow>
        </TableHeader>
        <TableBody className="selection-table">
          <TableRow>
            <TableColumn plain>W Blot</TableColumn>
            <TableColumn plain>All</TableColumn>
            <TableColumn plain>EFIC</TableColumn>
            <TableColumn plain>WM</TableColumn>
            <TableColumn plain>Scan</TableColumn>
            <TableColumn plain>BarChart</TableColumn>
            <TableColumn plain>MRI/CT</TableColumn>
            <TableColumn plain>3D Struc</TableColumn>
            <TableColumn plain>All</TableColumn>
          </TableRow>
          <TableRow>
            <TableColumn plain>N Blot</TableColumn>
            <TableColumn />
            <TableColumn plain>WM</TableColumn>
            <TableColumn plain>InSitu Hyb</TableColumn>
            <TableColumn plain>Transm</TableColumn>
            <TableColumn plain>LineChart</TableColumn>
            <TableColumn plain>X-Ray</TableColumn>
            <TableColumn plain>DNA</TableColumn>
            <TableColumn />
          </TableRow>
          <TableRow>
            <TableColumn plain>RT_PCR</TableColumn>
            <TableColumn />
            <TableColumn plain>Rep Genes Immuno</TableColumn>
            <TableColumn plain>Other</TableColumn>
            <TableColumn />
            <TableColumn plain>Diagram</TableColumn>
            <TableColumn plain>Photos</TableColumn>
            <TableColumn plain>RNA</TableColumn>
            <TableColumn />
          </TableRow>
          <TableRow>
            <TableColumn />
            <TableColumn />
            <TableColumn plain>Other</TableColumn>
            <TableColumn />
            <TableColumn />
            <TableColumn plain>Scatter</TableColumn>
            <TableColumn />
            <TableColumn plain>Chem Struc</TableColumn>
            <TableColumn />
          </TableRow>
          <TableRow>
            <TableColumn />
            <TableColumn />
            <TableColumn />
            <TableColumn />
            <TableColumn />
            <TableColumn plain>Other</TableColumn>
            <TableColumn />
            <TableColumn />
            <TableColumn />
          </TableRow>
        </TableBody>
      </DataTable>
    )
  }

  drawVertical() {
    return (
      <DataTable plain>
        <TableBody className="selection-table">
          <TableRow>
            <TableColumn className="selection-table selected-td" plain>Gel</TableColumn>
            <TableColumn plain className="selection-table">Western</TableColumn>
            <TableColumn plain className="selection-table">Northern</TableColumn>
            <TableColumn plain className="selection-table">RT_PCR</TableColumn>
            <TableColumn plain className="selection-table"/>
            <TableColumn plain className="selection-table"/>
          </TableRow>
          <TableRow>
            <TableColumn plain className="selection-table selected-td">Plate</TableColumn>
            <TableColumn plain className="selection-table">Plate</TableColumn>
            <TableColumn plain className="selection-table"/>
            <TableColumn plain className="selection-table"/>
            <TableColumn plain className="selection-table"/>
            <TableColumn plain className="selection-table"/>
          </TableRow>
          <TableRow>
            <TableColumn plain className="selection-table selected-td">Fluorescence</TableColumn>
            <TableColumn plain className="selection-table">EFIC</TableColumn>
            <TableColumn plain className="selection-table">Whole Mount</TableColumn>
            <TableColumn plain className="selection-table">Reporter Genes & Immuno</TableColumn>
            <TableColumn plain className="selection-table">Other Fluo.</TableColumn>
            <TableColumn plain className="selection-table"/>
          </TableRow>
          <TableRow>
            <TableColumn plain className="selection-table selected-td">Light</TableColumn>
            <TableColumn plain className="selection-table">Whole Mount</TableColumn>
            <TableColumn plain className="selection-table">InSitu Hyb</TableColumn>
            <TableColumn plain className="selection-table">Other Light</TableColumn>
            <TableColumn plain className="selection-table"/>
            <TableColumn plain className="selection-table"/>
          </TableRow>
          <TableRow>
            <TableColumn plain className="selection-table selected-td">Electron</TableColumn>
            <TableColumn plain className="selection-table">Scanning</TableColumn>
            <TableColumn plain className="selection-table">Transmission</TableColumn>
            <TableColumn plain className="selection-table"/>
            <TableColumn plain className="selection-table"/>
            <TableColumn plain className="selection-table"/>
          </TableRow>
          <TableRow>
            <TableColumn plain className="selection-table selected-td">Graphics</TableColumn>
            <TableColumn plain className="selection-table">Bar Chart</TableColumn>
            <TableColumn plain className="selection-table">Line Chart</TableColumn>
            <TableColumn plain className="selection-table">Diagram</TableColumn>
            <TableColumn plain className="selection-table">Scatterplot</TableColumn>
            <TableColumn plain className="selection-table">Other Graphic</TableColumn>
          </TableRow>
          <TableRow>
            <TableColumn plain className="selection-table selected-td">Organisms</TableColumn>
            <TableColumn plain className="selection-table">MRI/CT</TableColumn>
            <TableColumn plain className="selection-table">X-Ray</TableColumn>
            <TableColumn plain className="selection-table">Photographs</TableColumn>
            <TableColumn plain className="selection-table"/>
            <TableColumn plain className="selection-table"/>
          </TableRow>
          <TableRow>
            <TableColumn plain className="selection-table selected-td">Molecular Structure</TableColumn>
            <TableColumn plain className="selection-table">3D</TableColumn>
            <TableColumn plain className="selection-table">DNA</TableColumn>
            <TableColumn plain className="selection-table">RNA</TableColumn>
            <TableColumn plain className="selection-table"/>
            <TableColumn plain className="selection-table"/>
          </TableRow>
          <TableRow>
            <TableColumn plain className="selection-table selected-td">Other</TableColumn>
            <TableColumn plain className="selection-table">Other</TableColumn>
          </TableRow>
        </TableBody>
      </DataTable>
    )
  }

  drawVerticalChecks() {
    return (
      <DataTable plain>
        <TableBody className="selection-table">
          <TableRow>
            <TableColumn className="selection-table selected-td" plain>Gel</TableColumn>
            <TableColumn plain className="selection-table">
              <Checkbox
                    id="id2"
                    name="n2"
                    label="Northern"
                    value="Northern"
                    className="matrix-checkbox"
              />
            </TableColumn>
            <TableColumn plain className="selection-table">
              <Checkbox
                    id="id3"
                    name="n3"
                    label="RT_PCR"
                    value="RT_PCR"
                    className="matrix-checkbox"
              />
            </TableColumn>
            <TableColumn plain className="selection-table">
              <Checkbox
                    id="id1"
                    name="n1"
                    label="Western"
                    value="Western"
                    className="matrix-checkbox"
              />
            </TableColumn>
            <TableColumn plain className="selection-table"/>
            <TableColumn plain className="selection-table"/>
          </TableRow>
          <TableRow>
            <TableColumn plain className="selection-table selected-td">Plate</TableColumn>
            <TableColumn plain className="selection-table">
              <Checkbox
                    id="id4"
                    name="n4"
                    label="Plate"
                    value="Plate"
                    className="matrix-checkbox"
              />
            </TableColumn>
            <TableColumn plain className="selection-table"/>
            <TableColumn plain className="selection-table"/>
            <TableColumn plain className="selection-table"/>
            <TableColumn plain className="selection-table"/>
          </TableRow>
          <TableRow>
            <TableColumn plain className="selection-table selected-td">Fluorescence</TableColumn>
            <TableColumn plain className="selection-table">
              <Checkbox
                    id="id5"
                    name="n5"
                    label="EFIC"
                    value="EFIC"
                    className="matrix-checkbox"
              />
            </TableColumn>
            <TableColumn plain className="selection-table">
              <Checkbox
                    id="idwef7"
                    name="n7"
                    label="Reporter Genes & IHC"
                    value="Reporter Genes & IHC"
                    className="matrix-checkbox"
              />
            </TableColumn>
            <TableColumn plain className="selection-table">
              <Checkbox
                    id="id6"
                    name="n6"
                    label="Whole Mount"
                    value="Whole Mount"
                    className="matrix-checkbox"
              />
            </TableColumn>
            <TableColumn plain className="selection-table">
              <Checkbox
                    id="id8"
                    name="n8"
                    label="Other"
                    value="Other"
                    className="matrix-checkbox"
              />
            </TableColumn>
            <TableColumn plain className="selection-table"/>
          </TableRow>
          <TableRow>
            <TableColumn plain className="selection-table selected-td">Light</TableColumn>
            <TableColumn plain className="selection-table">
              <Checkbox
                    id="id9"
                    name="n9"
                    label="InSitu"
                    value="InSitu"
                    className="matrix-checkbox"
              />
            </TableColumn>
            <TableColumn plain className="selection-table">
              <Checkbox
                    id="id345343455559"
                    name="n9"
                    label="Whole Mount"
                    value="Whole Mount"
                    className="matrix-checkbox"
              />
            </TableColumn>
            <TableColumn plain className="selection-table">
            <Checkbox
                  id="id93"
                  name="n33"
                  label="Other"
                  value="Other"
                  className="matrix-checkbox"
            />
            </TableColumn>
            <TableColumn plain className="selection-table"/>
            <TableColumn plain className="selection-table"/>
          </TableRow>
          <TableRow>
            <TableColumn plain className="selection-table selected-td">Electron</TableColumn>
            <TableColumn plain className="selection-table">
              <Checkbox
                    id="id9wef"
                    name="n9"
                    label="Scanning"
                    value="Scanning"
                    className="matrix-checkbox"
              />
            </TableColumn>
            <TableColumn plain className="selection-table">
              <Checkbox
                    id="idregergr9"
                    name="n9"
                    label="Transmission"
                    value="Transmission"
                    className="matrix-checkbox"
              />
            </TableColumn>
            <TableColumn plain className="selection-table"/>
            <TableColumn plain className="selection-table"/>
            <TableColumn plain className="selection-table"/>
          </TableRow>
          <TableRow>
            <TableColumn plain className="selection-table selected-td">Graphics</TableColumn>
            <TableColumn plain className="selection-table">
              <Checkbox
                id="checkbox-read-material-design-spec"
                name="simple-checkboxes[]"
                label="Bar Chart"
                value="material-design"
                className="matrix-checkbox"
              />
            </TableColumn>
            <TableColumn plain className="selection-table">
              <Checkbox
                    id="idfwefwc"
                    name="nc"
                    label="Diagram"
                    value="Diagram"
                    className="matrix-checkbox"
              />
            </TableColumn>
            <TableColumn plain className="selection-table">
              <Checkbox
                    id="idn23rwe"
                    name="nn"
                    label="Line Chart"
                    value="Line Chart"
                    className="matrix-checkbox"
              />
            </TableColumn>
            <TableColumn plain className="selection-table">
              <Checkbox
                    id="idk"
                    name="nk"
                    label="Scatterplot"
                    value="Scatterplot"
                    className="matrix-checkbox"
              />
            </TableColumn>
            <TableColumn plain className="selection-table">
              <Checkbox
                    id="iwerwej"
                    name="nj"
                    label="Other"
                    value="Other"
                    className="matrix-checkbox"
              />
            </TableColumn>
          </TableRow>
          <TableRow>
            <TableColumn plain className="selection-table selected-td">Organisms</TableColumn>
            <TableColumn plain className="selection-table">
              <Checkbox
                    id="idr32r23rh"
                    name="nh"
                    label="MRI/CT"
                    value="MRI/CT"
                    className="matrix-checkbox"
              />
            </TableColumn>
            <TableColumn plain className="selection-table">
              <Checkbox
                    id="idge23e2"
                    name="ng"
                    label="Photos"
                    value="Photos"
                    className="matrix-checkbox"
              />
            </TableColumn>
            <TableColumn plain className="selection-table">
              <Checkbox
                    id="id32r32r3f"
                    name="nf"
                    label="X-Ray"
                    value="X-Ray"
                    className="matrix-checkbox"
              />
            </TableColumn>
            <TableColumn plain className="selection-table"/>
            <TableColumn plain className="selection-table"/>
          </TableRow>
          <TableRow>
            <TableColumn plain className="selection-table selected-td">Molecular Structure</TableColumn>
            <TableColumn plain className="selection-table">
              <Checkbox
                    id="ide32423"
                    name="ne"
                    label="3D"
                    value="3D"
                    className="matrix-checkbox"
              />
            </TableColumn>
            <TableColumn plain className="selection-table">
              <Checkbox
                    id="i23dd"
                    name="nd"
                    label="Chemical Structure"
                    value="Chemical Structure"
                    className="matrix-checkbox"
              />
            </TableColumn>
            <TableColumn plain className="selection-table">
              <Checkbox
                    id="id23c2"
                    name="nc2"
                    label="DNA"
                    value="DNA"
                    className="matrix-checkbox"
              />
            </TableColumn>
            <TableColumn plain className="selection-table">
              <Checkbox
                    id="idb213"
                    name="nb"
                    label="RNA"
                    value="RNA"
                    className="matrix-checkbox"
              />
            </TableColumn>
            <TableColumn plain className="selection-table"/>
          </TableRow>
          <TableRow>
            <TableColumn plain className="selection-table selected-td">Other</TableColumn>
            <TableColumn plain className="selection-table">
              <Checkbox
                    id="ida3423"
                    name="na"
                    label="Other"
                    value="Other"
                    className="matrix-checkbox"
              />
            </TableColumn>
          </TableRow>
        </TableBody>
      </DataTable>
    )
  }

  drawVerticalMenu() {
    const types1 = [{
          label: 'Western Blot',
          value: 'Western Blot',
        },
        {
          label: 'Northern Blot',
          value: 'Northern Blot',
        },
        {
          label: 'None',
          value: 'None',
        }
      ];

    const types2 = [{
          label: 'EFIC',
          value: 'EFIC',
        },
        {
          label: 'Whole Mount',
          value: 'Whole Mount',
        },
        {
          label: 'Reporter Genes & Immuno',
          value: 'Reporter Genes & Immuno',
        },
        {
          label: 'None',
          value: 'None',
        }
      ];

    return (
      <DataTable plain>
        <TableBody className="selection-table">
          <TableRow>
            <TableColumn className="selection-table" plain>Gel</TableColumn>
            <SelectFieldColumn menuItems={types1} defaultValue="None" />
            <SelectFieldColumn menuItems={types1} defaultValue="None" />
          </TableRow>
          <TableRow>
            <TableColumn plain className="selection-table">Plate</TableColumn>
            <SelectFieldColumn menuItems={types1} defaultValue="None" />
          </TableRow>
          <TableRow>
            <TableColumn plain className="selection-table">Fluorescence</TableColumn>
            <SelectFieldColumn menuItems={types2} defaultValue="None" />
            <SelectFieldColumn menuItems={types2} defaultValue="None" />
          </TableRow>
          <TableRow>
            <TableColumn plain className="selection-table">Light</TableColumn>
            <SelectFieldColumn menuItems={types1} defaultValue="None" />
            <SelectFieldColumn menuItems={types1} defaultValue="None" />
          </TableRow>
          <TableRow>
            <TableColumn plain className="selection-table">Electron</TableColumn>
            <SelectFieldColumn menuItems={types1} defaultValue="None" />
            <SelectFieldColumn menuItems={types1} defaultValue="None" />
          </TableRow>
          <TableRow>
            <TableColumn plain className="selection-table">Graphics</TableColumn>
            <SelectFieldColumn menuItems={types1} defaultValue="None" />
            <SelectFieldColumn menuItems={types1} defaultValue="None" />
          </TableRow>
          <TableRow>
            <TableColumn plain className="selection-table">Organisms</TableColumn>
            <SelectFieldColumn menuItems={types1} defaultValue="None" />
            <SelectFieldColumn menuItems={types1} defaultValue="None" />
          </TableRow>
          <TableRow>
            <TableColumn plain className="selection-table">Molecular Structure</TableColumn>
            <SelectFieldColumn menuItems={types1} defaultValue="None" />
            <SelectFieldColumn menuItems={types1} defaultValue="None" />
          </TableRow>
          <TableRow>
            <TableColumn plain className="selection-table">Other</TableColumn>
            <SelectFieldColumn menuItems={types1} defaultValue="None" />
          </TableRow>
        </TableBody>
      </DataTable>
    )
  }

  render() {
    return (
      <div>
        {this.drawVerticalChecks()}
        <div>Subfigure Observations</div>
        <Grid className="md-grid--no-spacing">
          <Cell size={4}>
            <SelectionControl
              id="is-compound"
              type="checkbox"
              label="Compound image?"
              name="lights"
              className="md-cell md-cell--12 custom-input-field"
            />
          </Cell>
          <Cell size={4}>
            <SelectionControl
              id="figure-cropping"
              type="checkbox"
              label="Needs cropping?"
              name="lights"
              className="md-cell md-cell--12 custom-input-field"
            />
          </Cell>
          <Cell size={4}>
            <TextField
              id="observations"
              label="Comments"
              lineDirection="center"
              className="custom-input-field md-cell md-cell--12"
              rows={1}
              value=""
            />
          </Cell>
        </Grid>
        <Toolbar
          themed
          className="properties-title"
          title=""
          actions={(
            [<Button flat secondary onClick={this.onSkip}>Skip</Button>,
              <Button flat secondary onClick={this.onSave}>Save</Button>]
          )}
        />
      </div>

    );
  }
}

SubImageModList.propTypes = {
  modalities: PropTypes.arrayOf(PropTypes.object),
};

export default SubImageModList;
