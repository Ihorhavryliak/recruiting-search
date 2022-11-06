import svg from './Gear-1s-197px.svg'
type LoadingType = {
  top?: string
  left?: string
}

export const Loading: React.FC<LoadingType> = (props) => {
  const {top = '10%'} = props;
  const {left = '50%'} = props;

  return (
    <div style={{position: 'absolute', top: top, left: left}}>
      
      <img className='loadPhoto' src={svg} alt="Loading"  />
    </div>
  )
}