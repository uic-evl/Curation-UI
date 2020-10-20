/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";

import Chart from "../vis/Chart";
import Axis from "../vis/Axis";
import Others from "../vis/Others";
import Bars from "../vis/Bars";
import { useChartDimensions, accessorPropsType } from "../vis/Utils";

const chartDimensions = {
  marginTop: 10,
  marginRight: 50,
  marginBottom: 0,
  marginLeft: 90,
};

const FineGrainBarChart = ({
  data,
  xAccessor,
  yAccessor,
  colorAccessor,
  colormap,
  label,
}) => {
  const [ref, dimensions] = useChartDimensions(chartDimensions);
  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(data, xAccessor))
    .range([0, dimensions.boundedWidth]);
  const yScale = d3
    .scaleBand()
    .domain(d3.range(data.length))
    .rangeRound([0, dimensions.boundedHeight])
    .padding(0.1);

  const xAccessorScaled = (d) => xScale(0);
  const xTextAccesorScaled = (d) => xScale(xAccessor(d));
  const yAccessorScaled = (d, i) => yScale(i);
  const widthAccessorScaled = (d) => xScale(xAccessor(d)) - xScale(0);
  const heightAccessorScaled = (d) => yScale.bandwidth();
  const keyAccessor = (d, i) => i;

  const yAxis = (g) =>
    g.attr("transform", `translate(${margin.left},0)`).call(
      d3
        .axisLeft(yScale)
        .tickFormat((i) => data[i].modality)
        .tickSizeOuter(0)
    );

  return (
    <div className="FineGrainBarChart" ref={ref}>
      <Others dimensions={dimensions}>
        <Axis dimension="y" scale={yScale} items={data.map(yAccessor)} />
        <Bars
          data={data}
          keyAccessor={keyAccessor}
          xAccessor={xAccessorScaled}
          yAccessor={yAccessorScaled}
          widthAccessor={widthAccessorScaled}
          heightAccessor={heightAccessorScaled}
          colorAccessor={colorAccessor}
          colormap={colormap}
          xTextAccesor={xAccessor}
          bandwidth={yScale.bandwidth()}
        />
      </Others>
    </div>
  );
};

FineGrainBarChart.propTypes = {
  data: PropTypes.array,
  xAccessor: accessorPropsType,
  yAccessor: accessorPropsType,
  label: PropTypes.string,
};

FineGrainBarChart.defaultProps = {
  xAccessor: (d) => d.count,
  yAccessor: (d) => d.modality,
};

export default FineGrainBarChart;
