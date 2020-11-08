/* eslint-disable */
import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import FigureItem from "./FigureItem";
import Summary from "./Summary";
import UpdatePanel from "./UpdatePanel";
import { Pagination } from "semantic-ui-react";
import axios from "axios";

const API_URL = process.env.API_URL;

const SearchSubfigures = () => {
  const [subfigures, setSubfigures] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [selectedFigures, setSelectedFigures] = useState([]);
  const [filters, setFilters] = useState({
    pageNumber: 1,
    pageSize: 18,
    state: "Reviewed",
  });
  const [modalities, setModalities] = useState({});

  useEffect(() => {
    const getModalities = async () => {
      const results = await axios.get(`${API_URL}modalities`);
      const tempModalities = {};
      const options = results.data.map((mod) => {
        tempModalities[mod._id] = `${mod.columnLabel} ${mod.simplify}`;
      });
      setModalities(tempModalities);
    };

    getModalities();
  }, []);

  const buildUrl = () => {
    let url = `${API_URL}searchSubfigures/?pageNumber=${filters.pageNumber}&pageSize=${filters.pageSize}`;
    if (filters.state) url = `${url}&state=${filters.state}`;
    if (filters.modalities && filters.modalities.length > 0)
      url = `${url}&modalities=${filters.modalities}`;
    if (filters.observations)
      url = `${url}&observations=${filters.observations}`;
    if (filters.additional && filters.additional.length > 0)
      url = `${url}&additional=${filters.additional}`;
    if (filters.username) url = `${url}&username=${filters.username}`;

    return url;
  };

  const flagSubfigure = async (id, flag) => {
    const url = `${API_URL}flag/${id}`;
    const results = await axios.post(url, { flag });

    const newSubfigures = [...subfigures];
    const idx = newSubfigures
      .map((e) => {
        return e._id;
      })
      .indexOf(results.data.figure._id);
    newSubfigures[idx] = results.data.figure;
    setSubfigures(newSubfigures);
  };

  const handleSearch = (searchFilters) => {
    const newFilters = {
      pageNumber: 1,
      pageSize: filters.pageSize,
    };
    if (searchFilters.state) newFilters["state"] = searchFilters.state;
    if (searchFilters.modalities && searchFilters.modalities.length > 0)
      newFilters["modalities"] = searchFilters.modalities;
    if (searchFilters.observations)
      newFilters["observations"] = searchFilters.observations;
    if (
      searchFilters.additionalObservations &&
      searchFilters.additionalObservations.length > 0
    )
      newFilters["additional"] = searchFilters.additionalObservations;
    if (searchFilters.username) newFilters["username"] = searchFilters.username;

    setFilters(newFilters);
  };

  const handleOnPageChange = (newPageNumber) => {
    const newFilters = { ...filters, pageNumber: newPageNumber };
    setFilters(newFilters);
  };

  useEffect(() => {
    const fetchSubfigures = async () => {
      const url = buildUrl();
      const results = await axios.get(url);
      console.log(results.data.subfigures);
      setSubfigures(results.data.subfigures);
      setTotalResults(results.data.total);
      setSelectedFigures([]);
    };

    fetchSubfigures();
  }, [filters]);

  const updateSelectedSubfigures = (figure, add) => {
    if (add) {
      setSelectedFigures([...selectedFigures, figure]);
    } else {
      setSelectedFigures(selectedFigures.filter((el) => el._id != figure._id));
    }
  };

  const updateFigures = async (figuresToUpdate) => {
    let url = `${API_URL}figures/updateModalities/`;
    const results = await axios.post(url, { subfigures: figuresToUpdate });
    setSelectedFigures([]);
    handleSearch(filters);
  };

  return (
    <div style={{ width: "100%" }} className="subfigures-parent">
      <section className="summaryArea">
        <Summary />
        <UpdatePanel
          selectedFigures={selectedFigures}
          modalitiesDict={modalities}
          updateFigures={updateFigures}
        />
      </section>
      <section className="searchArea">
        <SearchBar onSearch={handleSearch} />
        <div>{`${totalResults} images found, ${selectedFigures.length} images selected`}</div>
        <div className="figures-viewer">
          {subfigures.map((sf) => (
            <FigureItem
              key={sf._id}
              id={sf._id}
              url={sf.uri}
              name={sf.name}
              isCompound={sf.isCompound}
              needsCropping={sf.needsCropping}
              isOvercropped={sf.isOvercropped}
              isOverfragmented={sf.isOverfragmented}
              isFlagged={sf.flag}
              onFlag={flagSubfigure}
              onClickFigure={updateSelectedSubfigures}
              modalitiesDict={modalities}
              modalities={sf.modalities}
              isSelected={false}
            />
          ))}
        </div>
        <div>
          <Pagination
            defaultActivePage={1}
            totalPages={Math.ceil(totalResults / filters.pageSize)}
            onPageChange={(e, { activePage }) => handleOnPageChange(activePage)}
          />
        </div>
      </section>
    </div>
  );
};

export default SearchSubfigures;
