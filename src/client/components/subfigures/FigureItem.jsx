/* eslint-disable */
import React from "react";
import { Card, Icon, Image, Label } from "semantic-ui-react";
import axios from "axios";
import { useHistory } from "react-router";

const FigureItem = ({
  id,
  url,
  name,
  isCompound,
  needsCropping,
  isOverfragmented,
  isOvercropped,
  isFlagged,
  onFlag,
}) => {
  const baseUrl = "https://tinman.cis.udel.edu/images";
  const API_URL = process.env.API_URL;
  const history = useHistory();

  const showCompound = () => {
    return isCompound ? <Label>is-compound</Label> : "";
  };

  const showCropping = () => {
    return needsCropping ? <Label>needs cropping</Label> : "";
  };

  const showOverfragmented = () => {
    return isOverfragmented ? <Label>overfragmented</Label> : "";
  };

  const showOvercropped = () => {
    return isOvercropped ? <Label>over-cropped</Label> : "";
  };

  const showFlag = () => {
    return isFlagged ? (
      <a>
        <Icon name="flag" onClick={() => handleFlagging(false)} />
      </a>
    ) : (
      <a>
        <Icon name="flag outline" onClick={() => handleFlagging(true)} />
      </a>
    );
  };

  const showOpenTask = () => {
    return (
      <a>
        <Icon name="external alternate" onClick={() => handleOpenTask()} />
      </a>
    );
  };

  const handleFlagging = (flag) => {
    onFlag(id, flag);
  };

  const handleOpenTask = async () => {
    const apiUrl = `${API_URL}figure/taskUrl/${id}`;
    const result = await axios.get(apiUrl);

    history.push({ pathname: result.data.url });
  };

  return (
    <Card>
      <Image src={baseUrl + url} size="small" wrapped ui={true}></Image>
      <Card.Content extra>
        {showCompound()}
        {showCropping()}
        {showOverfragmented()}
        {showOvercropped()}
        {showFlag()}
        {showOpenTask()}
      </Card.Content>
    </Card>
  );
};

export default FigureItem;

/*
<div style={{ width: "150px" }}>
            <img src={baseUrl + url} alt="" width="100%" style={{ maxHeight: "150px" }} />
        </div>
        */
