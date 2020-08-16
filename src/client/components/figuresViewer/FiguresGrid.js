/* eslint-disable */
import React from "react"
import gxdList from "./gxd"
import FigureItem from "./FigureItem"

const FiguresGrid = () => {
  const imageList = gxdList.slice(1, 50)

  return (
    <div class="figures-viewer">
      {imageList.map((figureId) => (
        <FigureItem url={figureId} />
      ))}
    </div>
  )
}

export default FiguresGrid
