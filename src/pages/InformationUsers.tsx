import axios from "axios";
import { useEffect, useState } from "react";
import { SearchUserType, UserType } from "../App";
import { Loading } from "../tools/loading";
import { Timer } from "./Timer";
import styles from '../App.module.css'

type PropType = {
  user: SearchUserType | null
  setLoad: (bool: boolean) => void
  isLoad: boolean
  
}
const secondNumber = 10;
export const  InformationUsers: React.FC<PropType> = ({user, setLoad, isLoad}) => {
  const [userDetales, setUserDetales] = useState<null | UserType>(null);
  const [seconds, setSeconds] = useState(secondNumber);



  useEffect(()=>{
    if(seconds < 1) {
      setUserDetales(null)
    }
  },[seconds])

  useEffect(() => {
    console.log('user detalis')
    if (!!user) {
      setLoad(true)
      axios.get<UserType>(`https://api.github.com/users/${user.login}`)
        .then(res => {
         setSeconds(secondNumber);
          setUserDetales(res.data);
          setLoad(false)
        }
        ).catch(error => {
          setLoad(false)
          alert('Reload The Page Please. ' + error + ' Error: ' + error.request.response)
        })
    }
  }, [user, setLoad]);
  
  return (
    <div >
      {isLoad && <Loading top={'20%'} />}
    {userDetales && <div>
      <Timer seconds={seconds} onChange={setSeconds} timerKey={userDetales.id.toString()}/>
      <h2>{userDetales.login} </h2>

        <img className="userPhoto" alt='dsf' src={userDetales.avatar_url} />
        <br/>
        {userDetales.login}, followers: {userDetales.followers} 
    </div>}  
    {!userDetales && <div>Please choose profile</div>}
  </div>
  )
}