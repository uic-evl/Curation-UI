/* eslint-disable */
import React from "react";
import FineGrainBarChart from "./FineGrainBarChart";

const data = [
  {
    modality: "Gel - Northern",
    family: "Experimental",
    subfamily: "Gel",
    count: 19,
  },
  {
    modality: "Gel - Other",
    family: "Experimental",
    subfamily: "Gel",
    count: 5,
  },
  {
    modality: "Gel - RT_PCR",
    family: "Experimental",
    subfamily: "Gel",
    count: 31,
  },
  {
    modality: "Gel - Western",
    family: "Experimental",
    subfamily: "Gel",
    count: 207,
  },
  {
    modality: "Gra - Graph",
    family: "Graphics",
    subfamily: "Graph",
    count: 99,
  },
  {
    modality: "Gra - Heatmap",
    family: "Graphics",
    subfamily: "Heatmap",
    count: 46,
  },
  {
    modality: "Gra - Histogram",
    family: "Graphics",
    subfamily: "Bar Chart",
    count: 949,
  },
  {
    modality: "Gra - Line Chart",
    family: "Graphics",
    subfamily: "Line Chart",
    count: 630,
  },
  {
    modality: "Gra - Other",
    family: "Graphics",
    subfamily: "Other",
    count: 447,
  },
  {
    modality: "Gra - Scatterplo",
    family: "Graphics",
    subfamily: "Scatterplot",
    count: 41,
  },
  {
    modality: "Ele - Other",
    family: "Experimental",
    subfamily: "Microscopy",
    count: 2,
  },
  {
    modality: "Ele - Scanning",
    family: "Experimental",
    subfamily: "Microscopy",
    count: 1,
  },
  {
    modality: "Ele - Transmissi",
    family: "Experimental",
    subfamily: "Microscopy",
    count: 63,
  },
  {
    modality: "Flu - EFIC",
    family: "Experimental",
    subfamily: "Microscopy",
    count: 15,
  },
  {
    modality: "Flu - InSitu Hyb",
    family: "Experimental",
    subfamily: "Microscopy",
    count: 3,
  },
  {
    modality: "Flu - Other",
    family: "Experimental",
    subfamily: "Microscopy",
    count: 88,
  },
  {
    modality: "Flu - Reporter G",
    family: "Experimental",
    subfamily: "Microscopy",
    count: 1891,
  },
  {
    modality: "Flu - Whole Moun",
    family: "Experimental",
    subfamily: "Microscopy",
    count: 1,
  },
  {
    modality: "Lig - InSitu Hyb",
    family: "Experimental",
    subfamily: "Microscopy",
    count: 154,
  },
  {
    modality: "Lig - Other",
    family: "Experimental",
    subfamily: "Microscopy",
    count: 47,
  },
  {
    modality: "Lig - Reporter G",
    family: "Experimental",
    subfamily: "Microscopy",
    count: 5,
  },
  {
    modality: "Lig - Whole Moun",
    family: "Experimental",
    subfamily: "Microscopy",
    count: 395,
  },
  {
    modality: "Mol - 3D Struc",
    family: "Molecular Structure",
    subfamily: "3D Structure",
    count: 216,
  },
  {
    modality: "Mol - Chemical S",
    family: "Molecular Structure",
    subfamily: "Chemical Structure",
    count: 218,
  },
  {
    modality: "Mol - DNA Seq",
    family: "Molecular Structure",
    subfamily: "Macromolecule Sequence",
    count: 34,
  },
  {
    modality: "Mol - Protein Se",
    family: "Molecular Structure",
    subfamily: "Macromolecule Sequence",
    count: 231,
  },
  {
    modality: "Org - Photos",
    family: "Organs and Organisms",
    subfamily: "Photographs",
    count: 4,
  },
  {
    modality: "Org - X-Ray",
    family: "Organs and Organisms",
    subfamily: "X-Ray",
    count: 1,
  },
  { modality: "Oth - Other", family: "Other", subfamily: "", count: 106 },
  {
    modality: "Pla - Plate",
    family: "Experimental",
    subfamily: "Plate",
    count: 16,
  },
];

const colormap = {
  Microscopy: "#8dd3c7",
  "Organs and Organisms": "#bebada",
  Graphics: "#fb8072",
  "Molecular Structure": "#80b1d3",
  Gel: "#fdb462",
};

const Summary = () => {
  const modalityTextAccessor = (d) => d.modality;
  const countAccessor = (d) => d.count;
  const colorAccessor = (d) => {
    if (d.subfamily == "Microscopy" || d.subfamily == "Gel") {
      return d.subfamily;
    } else {
      return d.family;
    }
  };

  return (
    <div>
      <div>Summary</div>
      <FineGrainBarChart
        data={data}
        xAccesor={countAccessor}
        yAccessor={modalityTextAccessor}
        colorAccessor={colorAccessor}
        colormap={colormap}
        label="Test"
      />
    </div>
  );
};

export default Summary;
