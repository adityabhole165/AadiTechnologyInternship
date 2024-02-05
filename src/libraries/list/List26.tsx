import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import TextCommaNumber from '../Text/TextCommaNumber';
import List3ColSelAll from './List3ColSelAll';

List26.propTypes = {
  Dataa: PropTypes.any,
  getAbsetNumber: PropTypes.any
};
function List26({
  Dataa,
  getAbsetNumber,
  assignedDate,
  sendmeassagestudent,
  handleCheckboxChange
}) {
  const [textarray, setTextarray] = useState('');
  const [getLabel, setGetLabel] = useState('Comma separated Roll Number');
  const [Data, setData] = useState([]);

  const refreshData = (data) => {
    let arr = [];
    data.map((obj) => {
      if (!obj.isActive) arr.push(obj.text1);
    });
    setTextarray(arr.join(','));
    setGetLabel('Comma separated Roll Number');
    getAbsetNumber(arr.join(','));
    setData(data);
  };

  useEffect(() => {
    refreshData(Dataa);
  }, [Dataa]);

  const changeText = (data) => {
    setTextarray(data.text);
    setGetLabel(data.getLabel);
    getAbsetNumber(data.text);
    let arr = data.text.split(',');
    setData(
      Data.map((obj) =>
        arr.includes(obj.text1)
          ? { ...obj, isActive: false }
          : { ...obj, isActive: true }
      )
    );
  };

  return (
    <>
      <>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            backgroundColor: 'white',
            p: 1,
            borderBottom: '1px solid gray'
          }}
        >
          <Box sx={{ flex: 1 }}>
            <TextCommaNumber
              name={'Roll Number'}
              textarray={textarray}
              validarray={Data.map((obj) => obj.text1)}
              changeText={changeText}
              getLabel={getLabel}
            />
          </Box>
          <Typography margin={'1px'}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={sendmeassagestudent}
                  onChange={(e) => {
                    handleCheckboxChange(e.target.checked);
                  }}
                />
              }
              label="Send Message to Absent Student(s)"
            />
          </Typography>
        </Box>
        <List3ColSelAll
          Itemlist={Data}
          refreshData={refreshData}
          assignedDate={assignedDate}
        />
      </>
    </>
  );
}

export default List26;
