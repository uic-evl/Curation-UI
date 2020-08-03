/* eslint-disable */
import React from 'react';
import TooltipCheckbox from "client/components/form/tooltippedCheckbox";
import { TextField, SelectField, SelectionControlGroup } from 'react-md';

const Observations = () => {
    const getSubpaneOptions = (k) => {
        const subpanes = [];
        for (let i = 0; i < k; i++) {
            subpanes.push({ label: (i + 1).toString(), value: (i + 1) });
        }
        return subpanes;
    }

    const subpanes = getSubpaneOptions(30);

    return (
        <div className="observations-wrapper">
            <TooltipCheckbox
                id="chbox-close-up"
                type="checkbox"
                label="Close-up image"
            />
            <TooltipCheckbox
                id="chbox-compound"
                label="Compound figure - should be further separated"
                tooltipLabel="e.g. Panel A and Panel B are still shown together"
                tooltipPosition="top"
            />
            <TooltipCheckbox
                id="chbox-multipane"
                label="Multipane Figure"
            />
            <SelectField
                id="ddl-numberSubpanes"
                label="Number subfigures"
                menuItems={subpanes}
            />
            <SelectionControlGroup
                id="selection-control-group-radios"
                name="pane-composition"
                type="radio"
                controls={[{
                    label: 'Heterogeneous',
                    value: 'Heterogeneous',
                }, {
                    label: 'Homogeneous',
                    value: 'Homogeneous',
                }]}
            />
            <TooltipCheckbox
                id="chbox-cropping"
                type="checkbox"
                label="Should be further cropped"
                tooltipLabel="Margins are too wide"
                tooltipPosition="top"
            />
            <TooltipCheckbox
                id="chbox-overcropped"
                type="checkbox"
                label="Over-cropped"
                tooltipLabel="Areas of the image were over-cropped"
                tooltipPosition="top"
            />
            <TooltipCheckbox
                id="chbox-overfragmented"
                type="checkbox"
                label="Over-fragmented"
                tooltipLabel="Pane is sub-area of sub-figure"
                tooltipPosition="top"
            />
            <TooltipCheckbox
                id="chbox-missing-subfigures"
                type="checkbox"
                label="Missing subfigures"
                tooltipLabel="Parent figure is complete but there are missing subfigures"
                tooltipPosition="top"
            />
            <TextField
                id="observations"
                label="Comments"
                lineDirection="center"
                rows={2}
            />
        </div>
    )
}

export default Observations;
