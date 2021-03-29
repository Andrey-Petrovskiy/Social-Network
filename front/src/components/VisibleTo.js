import React from 'react';

import CustomRadioField from './Fields/CustomRadioField';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

function VisibleTo({ values, handleChange }) {
  return (
    <RadioGroup
      aria-label="position"
      name="position"
      value={values.visible_to}
      onChange={handleChange}
    >
      <CustomRadioField
        value="all"
        control={<Radio />}
        label="All"
        labelPlacement="end"
        name="visible_to"
      />
      <CustomRadioField
        value="friends"
        control={<Radio />}
        label="My friends"
        labelPlacement="end"
        name="visible_to"
      />
      <CustomRadioField
        value="me"
        control={<Radio />}
        label="Only me"
        labelPlacement="end"
        name="visible_to"
      />
    </RadioGroup>
  );
}

export default VisibleTo;
