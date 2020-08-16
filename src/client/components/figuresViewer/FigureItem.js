/* eslint-disable */
import React from "react"

const FigureItem = ({ url }) => {
  const baseUrl = "https://tinman.cis.udel.edu/GXD_images/images/"

  return (
    <div>
      <img src={baseUrl + url} alt="" width="200" height="200" />
    </div>
  )
}

export default FigureItem
