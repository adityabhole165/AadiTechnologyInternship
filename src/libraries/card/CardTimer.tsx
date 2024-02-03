import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
function CardTimer({ GetExamSchedules }) {
  const value = parseInt(GetExamSchedules[0].StartTime);
  const startTime =
    parseInt(GetExamSchedules[0].StartTime.split(':')[0]) * 60 * 60 +
    parseInt(GetExamSchedules[0].StartTime.split(':')[1]) * 60;
  const endTime =
    parseInt(GetExamSchedules[0].EndTime.split(':')[0]) * 60 * 60 +
    parseInt(GetExamSchedules[0].EndTime.split(':')[1]) * 60;
  const [time, setTime] = useState(endTime - startTime); // Time duration in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      if (time > 0) {
        setTime(time - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${
      remainingSeconds < 10 ? '0' : ''
    }${remainingSeconds}`;
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <p>
        <b>Exam Time: </b> {formatTime(time)}
      </p>
    </Box>
  );
}

export default CardTimer;
