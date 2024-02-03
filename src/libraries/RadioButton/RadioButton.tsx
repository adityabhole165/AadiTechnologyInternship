import { Box, FormControl, FormLabel, Radio, RadioGroup } from '@mui/material';
import { FormControlLabel1 } from '../styled/ButtonStyle';

const RadioButton = ({ Array, ClickRadio, defaultValue = '1', Label }) => {
  return (
    <>
      <FormControl>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row'
          }}
        >
          <FormLabel id="demo-controlled-radio-buttons-group">
            {Label}
          </FormLabel>

          <RadioGroup
            value={defaultValue}
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            onChange={(e) => ClickRadio(e.target.value)}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                ml: '10px',
                mt: '-10px'
              }}
            >
              {Array.map((items, i) => {
                return (
                  <FormControlLabel1
                    key={i}
                    value={items.Value}
                    control={<Radio size="small" />}
                    label={items.Name}
                  />
                );
              })}
            </Box>
          </RadioGroup>
        </Box>
      </FormControl>
    </>
  );
};

export default RadioButton;
