
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import style from './../App.module.css'

type PropsType = {
  value: string
  onSubmit: (fixedValue: string) => void
  isLoadSearch: boolean
}

export const SearchBlock: React.FC<PropsType> = ({onSubmit, value, isLoadSearch}) => {
  let startTexs = 'All';
  const [temperSearch, setTemperSearch] = useState('');

  const [str, setStr] = useSearchParams('');
  const strings = str.get('seartch')

 
  useEffect(()=>{
    if (strings) {
      setTemperSearch(strings)
    }
    
  },[strings]);

  const reset = () => {
    setTemperSearch(startTexs);
    onSubmit(startTexs);
    setStr('');
  }

return (
 
  <div className="input-group">
    <input className="form-control" placeholder='Search on GitHub' value={temperSearch} onChange={(e) =>
      {setTemperSearch(e.currentTarget.value); setStr({'seartch': e.currentTarget.value}) } } />
    <button className="btn btn-outline-secondary" onClick={() => {onSubmit(temperSearch) }}>
     {/* {isLoadSearch ? 'Loading...' : 'Find'} */}  Find
      </button>
      <button className="btn btn-outline-secondary" onClick={reset}>Reset</button>
  </div>


)
}