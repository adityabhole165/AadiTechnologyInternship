import * as React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface Student {
    Id: string;
    Text77: string;
    Text2: string;
    Text3: string; // Student Name
    Text4: string; // Marks in "97 / 110" format
    IsHighlightStudent: boolean;
  }
  
  // Props type for the ToppersList component
  interface ToppersListProps {
    studentData: Student[];
  }

// Progress bar with a label showing percentage
function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

// The main component that renders the list of students with their progress
function ToppersList( {studentData} : ToppersListProps  ) {
  // Dummy data (assuming you'd fetch it from a service or use a prop)


  return (
    <Box sx={{ width: '100%', maxWidth: 600, margin: 'auto', mt: 2, p:2 }}>
      {/* <Typography variant="h6" gutterBottom>Toppers List</Typography> */}
      {studentData.map((student) => {
        // Calculate percentage from "97 / 110" format
        const [marksObtained, totalMarks] = student.Text4.split(' / ').map(Number);
        const percentage = (marksObtained / totalMarks) * 100;

        return (
          <Box key={student.Id} sx={{ mb: 2 }}>
            <Typography variant="h4">{student.Text3}</Typography>
            <LinearProgressWithLabel value={percentage} />
          </Box>
        );
      })}
    </Box>
  );
}

export default ToppersList