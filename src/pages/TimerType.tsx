import React, { useEffect, useState } from 'react';

type TimerType = {
  onChange: (acrual: number) => void;
  seconds: number;
  timerKey: string;
};

export const Timer: React.FC<TimerType> = (props) => {
  const [seconds, setSeconds] = useState(props.seconds);

  useEffect(() => {
    setSeconds(props.seconds);
  }, [props.seconds]);

  useEffect(() => {
    props.onChange(seconds);
  }, [seconds]);

  useEffect(() => {

    const iterval = setInterval(() => {
      console.log('time');
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => { clearInterval(iterval); };
  }, [props.timerKey]);



  return (
    <div>
      
    {seconds < 4 ?  <span>The profile will disappear in:<b style={{color: 'red'}}> {seconds}</b></span>  
    :  <span>The profile will disappear in: <b>{seconds}</b></span> }  
  
    </div>
  );
};
