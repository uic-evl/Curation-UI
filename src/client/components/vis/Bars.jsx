/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";
import { accessorPropsType, callAccessor } from "./Utils";
import { color } from "d3-color";

const Bars = ({
  data,
  keyAccessor,
  xAccessor,
  yAccessor,
  widthAccessor,
  heightAccessor,
  colorAccessor,
  colormap,
  xTextAccesor,
  bandwidth,
  ...props
}) => (
  <React.Fragment>
    <g>
      {data.map((d, i) => (
        <g key={i}>
          <rect
            {...props}
            className="Bars__rect"
            key={keyAccessor(d, i)}
            x={callAccessor(xAccessor, d, i)}
            y={callAccessor(yAccessor, d, i)}
            width={d3.max([callAccessor(widthAccessor, d, i), 0])}
            height={d3.max([callAccessor(heightAccessor, d, i), 0])}
            style={{ fill: `${colormap[colorAccessor(d)]}` }}
          />
          <text
            x={callAccessor(widthAccessor, d, i)}
            y={callAccessor(yAccessor, d, i) + bandwidth / 2}
            className="Bars__text_value"
            dx="2"
          >
            {callAccessor(xTextAccesor, d)}
          </text>
        </g>
      ))}
    </g>
  </React.Fragment>
);

Bars.propTypes = {
  data: PropTypes.array,
  keyAccessor: accessorPropsType,
  xAccessor: accessorPropsType,
  yAccessor: accessorPropsType,
  widthAccessor: accessorPropsType,
  heightAccessor: accessorPropsType,
};

Bars.defaultProps = {};

export default Bars;
