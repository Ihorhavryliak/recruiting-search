import React, { useEffect, useRef, useState } from 'react';
import './../App.css'
type TimerType = {
  onChange: (acrual: number) => void;
  seconds: number;
  timerKey: string;
};

export const Timer: React.FC<TimerType> = (props) => {

  const [seconds, setSeconds] = useState(props.seconds);
  const stop = useRef<any>([]);
  const start = useRef<any>([]);

  useEffect(() => {
    setSeconds(props.seconds);
  }, [props.seconds]);

  useEffect(() => {
    props.onChange(seconds);
  }, [seconds]);


  useEffect(() => {
    let timer = setInterval(() => {
    /*   console.log('time'); */
       setSeconds((prev) => prev - 1);
    }, 1000);;

    const startTime  = () => {
      timer =  setInterval(() => {
      /* console.log('time2'); */
       setSeconds((prev) => prev - 1);
    }, 1000);
    
    } 
     const stopTimer = () => {
      clearInterval(timer);
    }
    if (start.current !== null) {
      stop.current.addEventListener('click', stopTimer);
    }

    if (start.current !== null) {
      start.current.addEventListener('click', startTime);
    }
    

    return () => { clearInterval(timer);
      (start.current !== null && start.current.removeEventListener('click', startTime));
      (stop.current !== null && stop.current.removeEventListener('click', stopTimer));
    };
  }, [props.timerKey]);



  return (
    <div>
      
    {seconds < 4 ?  <span>The profile will disappear in:<b  className='redNumber timerNumber' > {seconds}</b></span>  
    :  <span>The profile will disappear in: <b className='timerNumber'>{seconds}</b></span> }  
  <button ref={stop} className='stopButton' >Stop</button>
  <button ref={start} >Continue</button>
    </div>
  );
};
