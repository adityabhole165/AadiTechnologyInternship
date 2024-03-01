import { Box, FormControl, InputLabel, Select } from '@mui/material';
import { useState } from 'react';
function DropDown({
  itemList,
  ClickItem,
  DefaultValue,
  Label,
  width,
  variant = 'standard',
  size = 'small'
}) {
  const [randomUniqueKey, setRandomUniqueKey] = useState(Math.random());

  return (
    <div>
      <Box width={width}>
        <FormControl
          fullWidth
          variant={variant as 'standard' | 'outlined' | 'filled'}
        >
          <InputLabel id={`label-${randomUniqueKey}`}>
            {Label} <span style={{ color: 'red' }}>*</span>
          </InputLabel>
          <Select
            fullWidth
            value={DefaultValue}
            label={Label}
            labelId={`label-${randomUniqueKey}`}
            onChange={(e) => ClickItem(e.target.value)}
            size={size as any}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 350
                }
              }
            }}
          >
            {DefaultValue == '' && <option>{Label}</option>}
            {itemList.map((item, i) => {
              return (
                <option value={item.Value} key={i}>
                  {item.Name}
                </option>
              );
            })}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}

export default DropDown;
