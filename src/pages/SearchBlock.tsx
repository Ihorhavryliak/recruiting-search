
import { useEffect, useState } from "react";
import style from './../App.module.css'

type PropsType = {
  value: string
  onSubmit: (fixedValue: string) => void
  isLoadSearch: boolean
}

export const SearchBlock: React.FC<PropsType> = ({onSubmit, value, isLoadSearch}) => {

  const [temperSearch, setTemperSearch] = useState('');
  
  useEffect(()=>{
    setTemperSearch(value)
  },[value]);

  const reset = () => {
    setTemperSearch('it')
    onSubmit('it')
  }

return (
 
  <div className={style.searchBlock}>
    <input placeholder='search' value={temperSearch} onChange={(e) => setTemperSearch(e.currentTarget.value)} />
    <button onClick={() => {onSubmit(temperSearch) }}>
     {isLoadSearch ? 'Load...find' : 'find'} 
      </button>
      <button onClick={reset}>Reset</button>
  </div>


)
}