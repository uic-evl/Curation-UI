/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Dropdown, Button } from "semantic-ui-react";

const API_URL = process.env.API_URL;

const actions = [
  {
    key: 0,
    text: "add modality",
    value: "add",
  },
  {
    key: 1,
    text: "remove modality",
    value: "remove",
  },
];

const UpdatePanel = ({ selectedFigures, modalitiesDict, updateFigures }) => {
  const [modalities, setModalities] = useState([]);
  const [selectedModality, setSelectedModality] = useState(null);
  const [action, setAction] = useState(null);

  useEffect(() => {
    setModalities(modalitiesToList(modalitiesDict));
  }, [modalitiesDict]);

  const modalitiesToList = (modalitiesDict) => {
    const modalities = [];
    for (let key in modalitiesDict) {
      modalities.push({
        key: key,
        value: key,
        text: modalitiesDict[key],
      });
    }
    return modalities;
  };

  const handleUpdate = () => {
    if (!action || !selectedModality) {
      console.log("Select an action and modality");
      return;
    }

    let figuresToUpdate = [];
    if (action === "add") {
      selectedFigures.forEach((el) => {
        const elModalities = el.modalities.map((m) => m._id);
        if (!elModalities.includes(selectedModality)) {
          figuresToUpdate.push({
            _id: el._id,
            modalities: [...el.modalities, selectedModality],
          });
        }
      });
    } else {
      selectedFigures.forEach((el) => {
        const elModalities = el.modalities.map((m) => m._id);
        if (elModalities.includes(selectedModality)) {
          figuresToUpdate.push({
            _id: el._id,
            modalities: el.modalities.filter((m) => m._id !== selectedModality),
          });
        }
      });
    }

    console.log(figuresToUpdate);
    updateFigures(figuresToUpdate);
  };

  return (
    <div>
      <div>Update {selectedFigures.length} subfigures</div>
      <Dropdown
        placeholder="Action"
        fluid
        selection
        options={actions}
        style={{ width: "100%" }}
        onChange={(e, { value }) => setAction(value)}
      />
      <Dropdown
        placeholder="Modality"
        fluid
        selection
        search
        options={modalities}
        style={{ width: "100%" }}
        onChange={(e, { value }) => setSelectedModality(value)}
      />
      <Button
        disabled={
          selectedFigures.length == 0 ||
          action == null ||
          selectedModality == null
        }
        onClick={handleUpdate}
      >
        Update
      </Button>
    </div>
  );
};

export default UpdatePanel;
