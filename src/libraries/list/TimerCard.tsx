import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';

const TimerCard = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  var timer;

  useEffect(() => {
    timer = setInterval(() => {
      setSeconds(seconds + 1);

      if (seconds === 59) {
        setMinutes(minutes + 1);
        setSeconds(0);
      }
      if (minutes === 59) {
        setHours(hours + 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  });

  // const stop = () => {
  //     clearInterval(timer);
  // }

  return (
    <>
      <Typography>
        <b>Exam Time: </b>
        {hours < 10 ? '0' + hours : hours}:
        {minutes < 10 ? '0' + minutes : minutes}:
        {seconds < 10 ? '0' + seconds : seconds}
      </Typography>
    </>
  );
};

export default TimerCard;
