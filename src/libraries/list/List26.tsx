import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography
} from '@mui/material';
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
  handleCheckboxChange,
  setIsDirty
}) {
  const [textarray, setTextarray] = useState('');
  const [getLabel, setGetLabel] = useState('Absent Student Roll Number');
  const [Data, setData] = useState([]);
  const [lateJoiners, setLateJoiners] = useState([]);
  const refreshData = (data) => {
    let arr = [];
    let lateJoinersArr = [];
    const selectedDate = new Date(assignedDate);
    // data.map((obj) => {
    //   if (!obj.isActive) arr.push(obj.text1);
    // });
    data.forEach((obj) => {
      const joinDateParts = obj.joinDate.split(/[- :]/);
      const joinDate = new Date(
        joinDateParts[2],
        joinDateParts[1] - 1,
        joinDateParts[0]
      );

      if (!obj.isActive && joinDate <= selectedDate) {
        arr.push(obj.text1);
      }

      if (joinDate > selectedDate) {
        lateJoinersArr.push(obj.text1);
      }
    });
    setTextarray(arr.join(','));
    setGetLabel('Absent Student Roll Number');
    getAbsetNumber(arr.join(','), data);
    setData(data);
    setLateJoiners(lateJoinersArr);
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
        arr.includes(obj.text1) && !obj.IsExamSubmitted
          ? { ...obj, isActive: false }
          : { ...obj, isActive: true }
      )
    );
  };

  return (
    <>
      <Box mr={2}> 
        <Grid
          container
          spacing={2}
          sx={{
            backgroundColor: 'white',
            p: 1,
            m:0,
            borderBottom: '1px solid gray'
          }}
        >
          {/* Roll Number Field */}
          <Grid item xs={12} sm={8} md={6}>
            <TextCommaNumber
              name={'Roll Number'}
              textarray={textarray}
              validarray={Data.map((obj) => obj.text1).filter(
                (num) => !lateJoiners.includes(num)
              )}
              changeText={changeText}
              getLabel={getLabel}
              assignedDate={assignedDate}
            />
          </Grid>

          {/* Checkbox Field */}
          <Grid
            item
            xs={12}
            sm={4}
            md={6}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start'
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={sendmeassagestudent}
                  onChange={(e) => handleCheckboxChange(e.target.checked)}
                />
              }
              label="Send Message to Absent Student(s)"
            />
          </Grid>
        </Grid>
        </Box>
        <List3ColSelAll
          Itemlist={Data}
          refreshData={refreshData}
          assignedDate={assignedDate}
          setIsDirty={setIsDirty}
        />
      
    </>
  );
}

export default List26;
