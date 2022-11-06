
import { useEffect, useState } from "react";



export const SearchBlock: React.FC<PropsType> = ({onSubmit, setCurrentPage,  value, isLoadSearch, setStr, str}) => {

  let startTexs = 'All';
  const [temperSearch, setTemperSearch] = useState('');
  const strings = str.get('seartch')
 
  useEffect(()=>{
    if (strings) {
      setTemperSearch(strings)
    }
  }, [strings]);

  const reset = () => {
    setTemperSearch('');
    onSubmit(startTexs);
    setStr('');
    setCurrentPage(0)
  }
  
return (
  <div className="input-group">
    <input className="form-control" placeholder='Search on GitHub' value={temperSearch} onChange={(e) =>
      {setTemperSearch(e.currentTarget.value); setStr({'seartch': e.currentTarget.value}) } } />
    <button className="btn btn-outline-secondary" onClick={() => {onSubmit(temperSearch); setCurrentPage(0) }}>
     {/* {isLoadSearch ? 'Loading...' : 'Find'} */}  Find
      </button>
      <button className="btn btn-outline-secondary" onClick={reset}>Reset</button>
  </div>


)
}

type PropsType = {
  value: string
  onSubmit: (fixedValue: string) => void
  isLoadSearch: boolean
  setStr: Function
  str: URLSearchParams
  setCurrentPage: (b: number)=> void
}