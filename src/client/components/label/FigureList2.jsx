/* eslint-disable */
import React from 'react'
import FigureListItem from './FigureListItem'

const FigureList2 = ({ figures, selectedId }) => {
    return (
        <React.Fragment>
            {figures.map((figure, idx) => {
                return <FigureListItem key={figure._id} item={figure} idx={idx} selectedId={selectedId} />;
            })}
        </React.Fragment>
    )
}

export default FigureList2;
