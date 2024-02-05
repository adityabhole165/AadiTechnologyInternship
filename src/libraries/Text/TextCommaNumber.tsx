import { Box, TextField } from '@mui/material';
import {
  checkIsNumber,
  isRepeat,
  isValueInArray,
  isValueInArrayContains
} from '../../components/Common/Util';

const TextCommaNumber = ({
  name,
  textarray,
  validarray,
  changeText,
  getLabel
}) => {
  const defaultLabel = 'Comma separated ' + name;
  let label = '';

  const SetTextData2 = (value) => {
    label = '';
    let arr = value.split(',');
    let lastNum = arr[arr.length - 1];
    if (validarray.length === 0) {
      label = 'There is no ' + name;
    }
    //if coma is enterred
    else if (lastNum !== '') {
      //check if number is valid
      if (!checkIsNumber(lastNum)) {
        label = 'Enter number only';
      }
      //check if number exists in array
      if (!isValueInArrayContains(lastNum, validarray)) {
        label = 'Invalid ' + name;
      }
    } else {
      if (arr.length > 1) {
        //check if comma entered without any text
        if (arr[arr.length - 2].length === 0) {
          label = 'Enter ' + name;
        }
        //check if number is repeated
        if (!isRepeat(arr[arr.length - 2], arr)) {
          label = 'Do not repeat ' + name;
        }
        //check if valid number
        if (!isValueInArray(arr[arr.length - 2], validarray)) {
          label = 'Invalid ' + name;
        }
      }
    }
    if (label === '') changeText({ text: value, getLabel: defaultLabel });
    else changeText({ text: textarray, getLabel: label });
  };

  return (
    <Box sx={{ backgroundColor: 'white' }}>
      <TextField
        InputLabelProps={{
          shrink: true
        }}
        fullWidth
        value={textarray}
        error={getLabel !== defaultLabel}
        label={getLabel}
        onChange={(e) => SetTextData2(e.target.value)}
      />
    </Box>
  );
};

export default TextCommaNumber;
