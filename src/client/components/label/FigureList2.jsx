/* eslint-disable */
import React from 'react'
import FigureListItem from './FigureListItem'

const FigureList2 = ({ figures }) => {
    return (
        <React.Fragment>
            {figures.map((figure) => {
                return <FigureListItem key={figure._id} item={figure} idx={1} />;
            })}
        </React.Fragment>
    )
}

export default FigureList2;
