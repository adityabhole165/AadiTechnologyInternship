import React, { useEffect } from 'react';

const TimerCard = () => {
  const [progress, setProgress] = React.useState(new Date().toLocaleString());
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(new Date().toLocaleString());
    }, 600);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return <div>{progress}</div>;
};

export default TimerCard;
