import React from 'react'

const Page = ({ pdfDoc, pageNum, scale }) => {
    return (
        <div style={{ width: "100%" }} className={"pdf-page-" + pageNum}>
            <canvas>

            </canvas>
        </div>
    )
}

export default Page;