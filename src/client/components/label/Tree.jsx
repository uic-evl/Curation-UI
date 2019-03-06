/* eslint-disable */
import React, { Component } from 'react';
import { tree, stratify, hierarchy } from 'd3-hierarchy';
import { select } from 'd3-selection';
import { format } from 'd3-format';
import { color } from 'd3-color';

class ModalitiesTree extends Component {
  constructor(props) {
    super(props);
    this.drawChart = this.drawChart.bind(this);
  }

  componentDidMount() {
    this.drawChart();
  }

  shouldComponentUpdate() {
    return false;
  }

  drawChart() {
    const data = {
      "name": "Categories",
      "children": [
        {
          "name": "Graphics",
          "children": [
            {
              "name": "Bar Chart"
            },
            {
              "name": "Diagram"
            },
            {
              "name": "Line Chart"
            },
            {
              "name": "Scatterplot"
            }
          ]
        },
        {
          "name": "Experimental",
          "children": [
            {
              "name": "Gel",
              "children": [
                {
                  "name": "Western Blot"
                },
                {
                  "name": "Northern Blot"
                },
                {
                  "name": "RT_PCR"
                }
              ]
            },
            {
              "name": "Microscopy",
              "children": [
                {
                  "name": "Light",
                  "children": [
                    {
                      "name": "Other LM"
                    },
                    {
                      "name": "Whole Mount Embryo"
                    },
                    {
                      "name": "In Situ Hybridization"
                    }
                  ]
                },
                {
                  "name": "Fluorescence",
                  "children": [
                    {
                      "name": "EFIC"
                    },
                    {
                      "name": "Other FM"
                    },
                    {
                      "name": "Whole Mount Embryo"
                    },
                    {
                      "name": "Reporter Genes and Immunohistology"
                    }
                  ]
                },
                {
                  "name": "Electron",
                  "children": [
                    {
                      "name": "Scanning EM"
                    },
                    {
                      "name": "Transmission EM"
                    }
                  ]
                }
              ]
            },
            {
              "name": "Plate"
            }
          ]
        },
        {
          "name": "Molecular Structure",
          "children": [
            {
              "name": "3D Structure"
            },
            {
              "name": "Chemical Structure"
            },
            {
              "name": "Macromolecule Sequence",
              "children": [
                {
                  "name": "DNA"
                },
                {
                  "name": "RNA"
                }
              ]
            }
          ]
        },
        {
          "name": "Organs and Organisms",
          "children": [
            {
              "name": "MRI and CT"
            },
            {
              "name": "Photographs"
            },
            {
              "name": "X-Ray"
            }
          ]
        },
        {
          "name": "Other"
        }
      ]
    };

    const root = hierarchy(data);
    const treeLayout = tree();
    treeLayout.size([300, 200]);
    treeLayout(root);

    const svg = this.svg;
    select(svg)
      .selectAll("circle.node")
      .data(root.descendants())
      .enter().append('circle')
        .classed('node', true)
        .attr('cx', function(d) {return d.x;})
        .attr('cy', function(d) {return d.y;})
        .attr('r', 4);

    select(svg)
      .selectAll('line.link')
      .data(root.links())
      .enter()
      .append('line')
      .classed('link', true)
      .attr('x1', function(d) {return d.source.x;})
      .attr('y1', function(d) {return d.source.y;})
      .attr('x2', function(d) {return d.target.x;})
      .attr('y2', function(d) {return d.target.y;});
  }

  render() {
    return(
      <div>
        <svg ref={(elem) => { this.svg = elem; }} width={300} height={200} />
      </div>
    )
  }
}

export default ModalitiesTree;
