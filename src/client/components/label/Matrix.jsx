/* eslint-disable */
import React from 'react';

const Matrix = () => {
    return (
        <div>
            <div className="matrix-row">
                <div className="matrix-header"><span>Gel</span></div>
                <div className="matrix-elem"><span>Western</span></div>
                <div className="matrix-elem"><span>Northern</span></div>
                <div className="matrix-elem"><span>RTC_PCR</span></div>
                <div className="matrix-elem"><span>Other</span></div>
            </div>
            <div className="matrix-row">
                <div className="matrix-header"><span>Plate</span></div>
                <div className="matrix-elem"><span>Plate</span></div>
            </div>
            <div className="matrix-row">
                <div className="matrix-header"><span>Fluorescence</span></div>
                <div className="matrix-elem"><span>Whole Mount</span></div>
                <div className="matrix-elem"><span>Reporter Genes & IHC</span></div>
                <div className="matrix-elem selected"><span>EFIC</span></div>
                <div className="matrix-elem"><span>Other</span></div>
            </div>
            <div className="matrix-row">
                <div className="matrix-header"><span>Light Mic.</span></div>
                <div className="matrix-elem"><span>Whole Mount</span></div>
                <div className="matrix-elem"><span>Reporter Genes & IHC</span></div>
                <div className="matrix-elem"><span>Other</span></div>
            </div>
            <div className="matrix-row">
                <div className="matrix-header"><span>Electron Mic.</span></div>
                <div className="matrix-elem"><span>Scanning</span></div>
                <div className="matrix-elem"><span>Transmission</span></div>
                <div className="matrix-elem"><span>Other</span></div>
            </div>
            <div className="matrix-row">
                <div className="matrix-header"><span>Graphics</span></div>
                <div className="matrix-elem"><span>Histogram</span></div>
                <div className="matrix-elem"><span>Line Chart</span></div>
                <div className="matrix-elem"><span>Scatterplot</span></div>
                <div className="matrix-elem"><span>Graphs</span></div>
                <div className="matrix-elem"><span>Heatmap</span></div>
                <div className="matrix-elem"><span>Other</span></div>
            </div>
            <div className="matrix-row">
                <div className="matrix-header"><span>Organs & Organisms</span></div>
                <div className="matrix-elem"><span>X-Ray</span></div>
                <div className="matrix-elem"><span>MRI & CT</span></div>
                <div className="matrix-elem"><span>Photos</span></div>
                <div className="matrix-elem"><span>Other</span></div>
            </div>
            <div className="matrix-row">
                <div className="matrix-header"><span>Molecular Structure</span></div>
                <div className="matrix-elem"><span>DNA Seq.</span></div>
                <div className="matrix-elem"><span>Protein Seq.</span></div>
                <div className="matrix-elem"><span>3D Struc.</span></div>
                <div className="matrix-elem"><span>Chemical Struc.</span></div>
                <div className="matrix-elem"><span>Other</span></div>
            </div>
            <div className="matrix-row">
                <div className="matrix-header"><span>Other</span></div>
                <div className="matrix-elem"><span>Other</span></div>
            </div>
        </div>
    )
}

export default Matrix;
