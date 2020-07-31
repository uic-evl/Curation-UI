/* eslint-disable */
import React, { useState, useEffect } from 'react'

const drawStateBar = (count) => {
    if (Object.keys(count).length === 0) { return (<React.Fragment></React.Fragment>) };

    const reviewed = ("Reviewed" in count) ? count["Reviewed"] : 0;
    const skipped = ("Skipped" in count) ? count["Skipped"] : 0;
    const toReview = ("To Review" in count) ? count["To Review"] : 0;
    const total = reviewed + skipped + toReview;

    return (
        <React.Fragment>
            {(reviewed > 0) && <div className="reviewed" style={{ "width": (100 * reviewed / total) + "px" }}></div>}
            {(skipped > 0) && <div className="skipped" style={{ "width": (100 * skipped / total) + "px" }}></div>}
            {(toReview > 0) && <div className="to-review" style={{ "width": (100 * toReview / total) + "px" }}></div>}
        </React.Fragment>
    );
}

const FigureListItem = ({ item, idx }) => {
    const [count, setCount] = useState({});
    const numberClass = (item.state == "To Review") ? "number fig-to-review" : "number fig-reviewed";
    const baseUrl = "https://tinman.cis.udel.edu/images";

    useEffect(() => {
        const subfigCount = {};
        item.subfigures.forEach(function (sf) {
            subfigCount[sf.state] = (subfigCount[sf.state] || 0) + 1;
        })
        setCount(subfigCount);
    }, [item]);

    return (
        <div className="figure-list-item">
            <div className="image-container">
                <div className="summary">
                    <div className="flex-wrapper">
                        <div className={numberClass}>&nbsp;</div>
                        <div className="states">
                            {drawStateBar(count)}
                        </div>
                    </div>
                </div>
                <img src={baseUrl + item.uri} alt="" width="100" height="100" />
            </div>
            <div className="item-content">{item.caption}</div>
        </div>
    )
}

export default FigureListItem;
