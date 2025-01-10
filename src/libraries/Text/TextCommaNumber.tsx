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
  getLabel,
  assignedDate
}) => {
  const defaultLabel = 'Absent Student ' + name;
  let label = '';
  const selectedDate = new Date(assignedDate);
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
    <Box sx={{ backgroundColor: 'white', width: '100%' }}>
      <TextField
        InputLabelProps={{
          shrink: true
        }}
        fullWidth
        value={textarray}
        error={getLabel !== defaultLabel}
        label={getLabel}
        onChange={(e) => SetTextData2(e.target.value)}
        InputProps={{
          readOnly: true,
          sx: {
            height: '30px', // Set the height of the input container
            padding: '0 0px', // Adjust padding as necessary
            '& .MuiOutlinedInput-root': {
              height: '30px', // Set the height of the input container
              '& fieldset': {
                top: 0,
                height: '100%', // Ensure fieldset takes full height
                '& legend': {
                  display: 'none',
                },
              },
            },
            '& .MuiInputBase-input': {
              padding: '5px 14px', // Adjust the padding to center the text vertically
              height: '20px', // Adjust the height of the input area
              boxSizing: 'border-box',
            },
          },
        }}
        sx={{
          margin: '8px 0', // Optionally, adjust the margin to fit the design
        }}
      />
    </Box>
  );
}

export default TextCommaNumber;
