import axios from "axios";
import { useEffect, useState } from "react";
import { SearchUserType, UserType } from "../App";
import { Loading } from "../tools/loading";
import style from './../App.module.css'
type PropsType = {
  serchTerm: string
  selecUser: SearchUserType | null
  onUserSelect: (user: SearchUserType)=> void
  setLoadSearch: (bol: boolean) => void
  isLoad: boolean
}
export const ListUsersBlock: React.FC<PropsType> = ({serchTerm, selecUser, onUserSelect, setLoadSearch, isLoad}) => {
  const [users, setUsers] = useState<SearchUserType[]>([]);


  useEffect(() => {
    console.log('user')
    setLoadSearch(true)
    axios.get<SearchUserType>(`https://api.github.com/search/users?q=${serchTerm}`)
      .then(res => {
                // @ts-ignore
        setUsers(res.data.items)
        setLoadSearch(false)
      }
      
      )
    
  }, [serchTerm]);

  return (<>
  <div>
    {isLoad && <Loading />}
    <ul>
    {users.map((s, i) => <li key={s.id} className={selecUser === s ? style.selected : ''}
      onClick={() => {
        onUserSelect(s)
      }}>{i + 1 + '. '}{s.login}</li>)}
  </ul>
  </div>
  </>
  )
}