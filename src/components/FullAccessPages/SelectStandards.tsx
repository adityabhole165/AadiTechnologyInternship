// import { Box, Checkbox, FormControlLabel, Grid, Typography } from '@mui/material';
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { IGetStandardsForExamCopyBody } from 'src/interfaces/Teacher/TExamSchedule';
// import { GetStandardsForExamCopy } from 'src/requests/TExamschedule/TExamschedule';
// import { RootState } from 'src/store';


// const SelectStandards: React.FC = () => {
//   const { StandardId, TestId } = useParams();
//   const dispatch = useDispatch();
//   const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
//   const asSchoolId = localStorage.getItem('localSchoolId');
//   const standards = useSelector((state: RootState) => state.StandardAndExamList.StandardsForExamCopy);


//   useEffect(() => {
//     const GetStandardsForExamCopyBody: IGetStandardsForExamCopyBody = {
//       asSchoolId: Number(asSchoolId),
//       asAcademicYearId: Number(asAcademicYearId),
//       asSchoolwiseExamId: Number(TestId),
//     };

//     dispatch(GetStandardsForExamCopy(GetStandardsForExamCopyBody))
//   }, [])
//   return (
//     <Box sx={{ pl: 0.5 }}>
//       <Typography variant="h5" color="primary" gutterBottom>
//         Select Standards :
//       </Typography>
//       <Grid container spacing={1}>
//         {standards.map((standard, index) => (
//           <Grid item xs={3} sm={2} md={1} key={index}>
//             <FormControlLabel
//               control={<Checkbox />}
//               label={standard.Standard}
//               labelPlacement="bottom"
//             />
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default SelectStandards;


import { Box, Checkbox, FormControlLabel, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IGetStandardsForExamCopyBody } from 'src/interfaces/Teacher/TExamSchedule';
import { GetStandardsForExamCopy } from 'src/requests/TExamschedule/TExamschedule';
import { RootState } from 'src/store';
import { decodeURL } from '../Common/Util';
interface SelectStandardsProps {
  selectedStandards: number[];
  setSelectedStandards: React.Dispatch<React.SetStateAction<number[]>>;
}
const SelectStandards: React.FC<SelectStandardsProps> = ({ selectedStandards, setSelectedStandards }) => {
  let {
    StandardId,
    TestId
  } = useParams();

  // Decode in-place
  StandardId = decodeURL(StandardId);
  TestId = decodeURL(TestId);

  const dispatch = useDispatch();
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const standards = useSelector((state: RootState) => state.StandardAndExamList.StandardsForExamCopy);

  // State to track selected standards' IDs
  //const [selectedStandards, setSelectedStandards] = useState<number[]>([]);

  useEffect(() => {
    const GetStandardsForExamCopyBody: IGetStandardsForExamCopyBody = {
      asSchoolId: Number(asSchoolId),
      asAcademicYearId: Number(asAcademicYearId),
      asSchoolwiseExamId: Number(TestId),
    };

    dispatch(GetStandardsForExamCopy(GetStandardsForExamCopyBody));
  }, [TestId, asSchoolId, asAcademicYearId, dispatch]);

  const handleCheckboxChange = (standardId: number) => {
    setSelectedStandards((prevSelectedStandards) => {
      // If the standard is already selected, remove it; otherwise, add it
      if (prevSelectedStandards.includes(standardId)) {
        return prevSelectedStandards.filter(id => id !== standardId);
      } else {
        return [...prevSelectedStandards, standardId];
      }
    });
  };

  return (
    <Box sx={{ pl: 0.5 }}>
      <Typography variant="h5" color="primary" gutterBottom>
        Select Standards :
      </Typography>
      <Grid container spacing={1}>
        {standards.map((standard, index) => (
          <Grid item xs={3} sm={2} md={1} key={index}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedStandards.includes(standard.Id)}
                  onChange={() => handleCheckboxChange(standard.Id)}
                />
              }
              label={standard.Standard}
              labelPlacement="bottom"
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SelectStandards;
