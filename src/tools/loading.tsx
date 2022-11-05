import svg from './Gear-1s-197px.svg'
type LoadingType = {

}

export const Loading: React.FC<LoadingType> = (props) => {
  return (
    <div style={{position: 'absolute', top: '10%', left: '50%'}}>
      
      <img src={svg} alt="Loading"  />
    </div>
  )
}