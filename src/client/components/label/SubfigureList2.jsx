/* eslint-disable */
import React from 'react';
import SubfigureListItem from './SubfigureListItem';

const SubfigureList2 = ({ subfigures }) => {
    const selectedId = null;

    return (
        <div className="subfigures-wrapper">
            {subfigures.map((subfigure, idx) => {
                return <SubfigureListItem key={subfigure._id} item={subfigure} idx={idx} selectedId={selectedId} />;
            })}
        </div>

    )
}

export default SubfigureList2;
