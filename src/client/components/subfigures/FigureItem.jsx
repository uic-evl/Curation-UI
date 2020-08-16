/* eslint-disable */
import React from "react"

const FigureItem = ({ url }) => {
    const baseUrl = "https://tinman.cis.udel.edu/images";

    return (
        <div style={{ width: "150px" }}>
            <img src={baseUrl + url} alt="" width="100%" style={{ maxHeight: "150px" }} />
        </div>
    )
}

export default FigureItem
