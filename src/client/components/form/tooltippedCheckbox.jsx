import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { SelectionControl, injectTooltip } from 'react-md';

const styles = {
  tooltipContainer: {
    position: 'relative',
  },
};

class TooltipCheckbox extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    tooltip: PropTypes.node,
    id: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    className: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
  };

  render() {
    const {
      children,
      tooltip,
      id,
      label,
      name,
      className,
      checked,
      onChange,
    } = this.props;
    return (
      <div style={styles.tooltipContainer}>
        {tooltip}
        <div className="md-grid--no-spacing">
          <SelectionControl
            id={id}
            type="checkbox"
            label={label}
            name={name}
            className={className}
            checked={checked}
            onChange={onChange}
          >
            {children}
          </SelectionControl>
        </div>
      </div>
    );
  }
}

export default injectTooltip(TooltipCheckbox);
