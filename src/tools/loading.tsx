import { useEffect, useState } from 'react'
import svg from './Gear-1s-197px.svg'
type LoadingType = {
  top?: string
  left?: string
}

export const Loading: React.FC<LoadingType> = (props) => {
  const {top = '10%'} = props;
  const {left = '50%'} = props;

  const [screenWigth, setScreenWigth] = useState<number>(() => window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWigth(() => window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (<>
    {screenWigth > 800 ?
    <div  style={{position: 'absolute', top: top, left: left}}>
       
      <img className='loadPhoto' src={svg} alt="Loading"  />
    </div>
    :  <div  style={{position: 'absolute', top: '30%', left: '20%'}}>
       
    <img className='loadPhoto' src={svg} alt="Loading"  />
  </div>}
    </>
  )
}