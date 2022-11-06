import axios from "axios";
import React, { useEffect, useState } from "react";
import { SearchResultType, SearchUserType  } from "../App";
import { Loading } from "../tools/loading";
import { PaginatedItems } from "../tools/Paginattor";
import style from './../App.module.css'
type PropsType = {
  serchTerm: string
  selecUser: SearchUserType | null
  onUserSelect: (user: SearchUserType) => void
  setLoadSearch: (bol: boolean) => void
  isLoad: boolean
  str: URLSearchParams
  setCurrentPage: (nun: number)=> void
  currentPage: number
}


export const ListUsersBlock: React.FC<PropsType> = React.memo(({ currentPage, serchTerm, selecUser, onUserSelect, setLoadSearch, isLoad, str, setCurrentPage }) => {

  const [users, setUsers] = useState<SearchResultType>();
  const [showMore, setShowMore] = useState<number>(10);
  const [screenWigth, setScreenWigth] = useState<number>(() => window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWigth(() => window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setLoadSearch(true)
    axios.get<SearchResultType>(`https://api.github.com/search/users?q=${serchTerm}&page=${currentPage + 1}`)
      .then(res => {
        setUsers(res.data)
        setShowMore(10)
        setLoadSearch(false)
      }
      ).catch(error => {
        setLoadSearch(false)
        alert('Reload The Page Please. ' + error + ' Error: ' + error.request.response)
      })

  }, [setLoadSearch, serchTerm, currentPage]);

  let nextPage = 0;
  if (currentPage !== 0) {
    nextPage = (30 * currentPage);
  }

  if (currentPage === 1) {
   
    nextPage = (30 * 1);
  }

  return (<>
    <div>
      {isLoad && <Loading top={'15%'} left={'5%'} />}
      {screenWigth < 800 &&
        <ul>
          {users?.items !== undefined && users?.items.filter((m, i) => i < showMore).map((s, i) => <li key={s.id} className={selecUser === s ? style.selected : ''}
            onClick={() => {
              onUserSelect(s)
            }}>{i + 1 + nextPage + '. '}{s.login}</li>)}
          {users?.items.length === undefined || users?.items.length < 0 || showMore === 30 || showMore > users?.items.length
            ? null
            : <div className="showMore" onClick={() => setShowMore(showMore + 10)}>  Show More ...</div>
          }
        </ul>
      }
      {screenWigth >= 800 && users?.items !== undefined &&
        <ul>
          {users?.items.map((s, i) => <li key={s.id} className={selecUser === s ? style.selected : ''}
            onClick={() => {
              onUserSelect(s)
            }}>{i + 1 + nextPage + '. '}{s.login}</li>)}
        </ul>
      }
      <div style={{ textAlign: 'center' }}>
        {users?.items !== undefined && users?.items.length === 0 && 'Nothing search. Please try search'}
      </div>
      {users?.items !== undefined
        ?  <PaginatedItems currentPage={currentPage} setCurrentPage={setCurrentPage}  items={users?.items} total_count={users.total_count}  /> : null}
    </div>
   {/*  <div key={`${cleanPage}`}></div> */}
  </>
  )
})