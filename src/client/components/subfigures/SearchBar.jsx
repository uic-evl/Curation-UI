/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Dropdown, Input, Button } from "semantic-ui-react";
import axios from "axios";

const stateOptions = [
  {
    key: 1,
    value: "Reviewed",
    text: "Reviewed",
  },
  {
    key: 2,
    value: "To Review",
    text: "To Review",
  },
  {
    key: 3,
    value: "Skipped",
    text: "Skipped",
  },
  {
    key: 4,
    value: "All",
    text: "All",
  },
];

const observationOptions = [
  {
    key: 1,
    value: "isCompound",
    text: "Compound Image",
  },
  {
    key: 2,
    value: "isOvercropped",
    text: "Overcropped",
  },
  {
    key: 3,
    value: "isOverfragmented",
    text: "Overfragmented",
  },
  {
    key: 4,
    value: "needsCropping",
    text: "Needs Cropping",
  },
  {
    key: 5,
    value: "closeUp",
    text: "Close-up",
  },
  {
    key: 6,
    value: "flag",
    text: "Flag",
  },
];

const API_URL = process.env.API_URL;

const SearchBar = ({ onSearch }) => {
  const [modalities, setModalities] = useState([]);
  const [observations, setObservations] = useState("");
  const [subfigureState, setSubfigureState] = useState("Reviewed");
  const [selectedModalities, setSelectedModalities] = useState([]);
  const [selectedObservations, setSelectedObservations] = useState([]);

  const handleSearch = () => {
    const filters = {
      observations: observations ? observations : undefined,
      state: subfigureState === "All" ? undefined : subfigureState,
      modalities: selectedModalities,
      additionalObservations: selectedObservations,
    };
    onSearch(filters);
  };

  useEffect(() => {
    const getModalities = async () => {
      const results = await axios.get(`${API_URL}modalities`);
      const options = results.data.map((mod) => {
        return {
          key: mod._id,
          value: mod._id,
          text: `${mod.columnLabel} ${mod.simplify}`,
        };
      });
      options.sort((el1, el2) => {
        const t1 = el1.text.toLowerCase();
        const t2 = el2.text.toLowerCase();
        if (t1 < t2) return -1;
        if (t1 < t2) return 1;
        return 0;
      });
      setModalities(options);
    };

    getModalities();
  }, []);

  return (
    <div className="search-bar">
      <Input
        placeholder="Observations..."
        value={observations}
        onChange={(event) => setObservations(event.target.value)}
      />

      <Dropdown
        placeholder="State"
        fluid
        selection
        options={stateOptions}
        value={subfigureState}
        onChange={(e, { value }) => setSubfigureState(value)}
        style={{ width: "200px" }}
      />

      {modalities.length > 0 && (
        <Dropdown
          placeholder="Modalities"
          fluid
          multiple
          search
          selection
          options={modalities}
          style={{ width: "100%" }}
          onChange={(e, { value }) => setSelectedModalities(value)}
        />
      )}

      <Dropdown
        placeholder="Observations"
        fluid
        multiple
        selection
        options={observationOptions}
        onChange={(e, { value }) => setSelectedObservations(value)}
      />

      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
};

export default SearchBar;
