/* eslint-disable */
import React from 'react';

const SubfigureListItem = ({ item }) => {

    const getCssState = (state) => {
        if (state === "To Review") return 'state pending';
        if (state === "Skipped") return 'state skipped';
        if (state === "Reviewed") return 'state reviewed';
    }

    const itemCssState = getCssState(item.state);
    const baseUrl = "https://tinman.cis.udel.edu/images";

    return (
        <div style={{ flex: 1 }}>
            <div className={itemCssState}></div>
            <img src={baseUrl + item.uri} alt="" width="75" height="75" />
        </div>
    )
}

export default SubfigureListItem;
