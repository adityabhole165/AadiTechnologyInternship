import React, { useState, useEffect } from 'react';
import {Box} from "@mui/material";
function CardTimer({GetExamSchedules}) {
  const value = parseInt(GetExamSchedules[0].StartTime)
  const startTime = parseInt(GetExamSchedules[0].StartTime) * 60 * 60; // 10:00 AM in seconds
  const endTime = parseInt(GetExamSchedules[0].EndTime) * 60 * 60;   // 11:00 AM in seconds

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
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <Box sx={{textAlign:"center"}}>
  
      <p><b>Exam Time: </b> {formatTime(time)}</p>
    </Box>
  );
}

export default CardTimer;
