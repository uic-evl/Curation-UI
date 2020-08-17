/* eslint-disable */
import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import FigureItem from './FigureItem';
import { Pagination } from 'semantic-ui-react';
import axios from "axios";

const API_URL = process.env.API_URL;

const SearchSubfigures = () => {
    const [subfigures, setSubfigures] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
    const [filters, setFilters] = useState({
        pageNumber: 1,
        pageSize: 30,
    });

    const buildUrl = () => {
        let url = `${API_URL}searchSubfigures/?pageNumber=${filters.pageNumber}&pageSize=${filters.pageSize}`
        if (filters.state) url = `${url}&state=${filters.state}`;
        if (filters.modalities && filters.modalities.length > 0) url = `${url}&modalities=${filters.modalities}`;
        if (filters.observations) url = `${url}&observations=${filters.observations}`;
        if (filters.additional && filters.additional.length > 0) url = `${url}&additional=${filters.additional}`;

        return url;
    }

    const flagSubfigure = async (id, flag) => {
        const url = `${API_URL}flag/${id}`;
        const results = await axios.post(url, { flag });

        const newSubfigures = [...subfigures];
        const idx = newSubfigures.map((e) => { return e._id; }).indexOf(results.data.figure._id);
        newSubfigures[idx] = results.data.figure;
        setSubfigures(newSubfigures);
    }

    const handleSearch = (searchFilters) => {
        const newFilters = {
            pageNumber: 1,
            pageSize: filters.pageSize,
        };
        if (searchFilters.state) newFilters['state'] = searchFilters.state;
        if (searchFilters.modalities.length > 0) newFilters['modalities'] = searchFilters.modalities;
        if (searchFilters.observations) newFilters['observations'] = searchFilters.observations;
        if (searchFilters.additionalObservations.length > 0) newFilters['additional'] = searchFilters.additionalObservations;

        setFilters(newFilters);
    }

    const handleOnPageChange = (newPageNumber) => {
        const newFilters = { ...filters, pageNumber: newPageNumber };
        setFilters(newFilters);
    }

    useEffect(() => {
        const fetchSubfigures = async () => {
            const url = buildUrl()
            const results = await axios.get(url);
            setSubfigures(results.data.subfigures);
            setTotalResults(results.data.total);
        }

        fetchSubfigures();
    }, [filters])

    return (
        <div style={{ width: '100%' }}>
            <SearchBar onSearch={handleSearch} />
            <div>{`${totalResults} images found`}</div>
            <div className="figures-viewer">
                {subfigures.map((sf) => (
                    <FigureItem key={sf._id}
                        id={sf._id}
                        url={sf.uri}
                        name={sf.name}
                        isCompound={sf.isCompound}
                        needsCropping={sf.needsCropping}
                        isOvercropped={sf.isOvercropped}
                        isOverfragmented={sf.isOverfragmented}
                        isFlagged={sf.flag}
                        onFlag={flagSubfigure} />
                ))}
            </div>
            <div>
                <Pagination
                    defaultActivePage={1}
                    totalPages={Math.ceil(totalResults / filters.pageSize)}
                    onPageChange={(e, { activePage }) => handleOnPageChange(activePage)}
                />
            </div>
        </div>
    )
}

export default SearchSubfigures;
