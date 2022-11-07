import React, { useEffect, useState } from 'react';
import { useLocation,  useNavigate,  useSearchParams } from 'react-router-dom';
import './App.css';
import { Footer } from './pages/Footer';
import { Header } from './pages/Header';
import { InformationUsers } from './pages/InformationUsers';
import { ListUsersBlock } from './pages/ListUsersBlock';
import { SearchBlock } from './pages/SearchBlock';

const App = React.memo(() => {

  const [serchTerm, setSerchTerm] = useState('a');
  const [selecUser, setSelecUser] = useState<SearchUserType | null>(null);
  const [isLoad, setLoad] = useState(false);
  const [isLoadSearch, setLoadSearch] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const location = useLocation();
  useEffect(()=>{
    const queryString = require('query-string');
    const parsed= queryString.parse(location.search);
    if(!!parsed.q){
      setSerchTerm(parsed.q);
    }
    if(parsed.page !== undefined && !isNaN(parsed.page)){
      setCurrentPage(+parsed.page - 1)
    }
  },[location.search])
  
  const history = useNavigate()
  useEffect(()=>{
     history(`/search/users?q=${serchTerm}&page=${currentPage + 1}`);
  }, [history, serchTerm, currentPage])

  useEffect(() => {
    if (selecUser) {
      document.title = selecUser.login;
    }
  }, [selecUser]);

  return (<div className='mainContainer'>
    <Header />
    <div className='block'>
      <div className='blockLeft'>
        <SearchBlock setCurrentPage={setCurrentPage} /* setStr={setStr} str={str} */ 
          value={serchTerm}
          onSubmit={(value: string) => { setSerchTerm(value) }}
          isLoadSearch={isLoadSearch} />
        <ListUsersBlock serchTerm={serchTerm} currentPage={currentPage}  setCurrentPage={setCurrentPage} 
       selecUser={selecUser} onUserSelect={setSelecUser}
          setLoadSearch={setLoadSearch} isLoad={isLoadSearch} />
      </div>
      <div className='blockRight'>
        <InformationUsers  user={selecUser} setLoad={setLoad} isLoad={isLoad} />
      </div>
    </div>
    <Footer />
  </div>
  );
})

export default App;

export type SearchUserType = {
  login: string
  id: number

}
export type SearchResultType = {
  items: Array<SearchUserType>
  total_count: number
}
export type UserType = {
  login: string
  id: number
  avatar_url: string
  followers: number
}


/* import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {   useLocation, useNavigate } from 'react-router-dom';
import { createDiologs } from '../../redux/dialogs-reducer';
import { AppDispatch } from '../../redux/redux-store';
import { getCurruntPage, getFollowingInProgres, getPageSize, getTotalUserCount, getUsersFilter, getUsersSelectorSuper } from '../../redux/user-selectors';
import { FilterType, follows, reqestUser, unfollows } from '../../redux/usere_reducer';
import Paginator from '../Common/Paginator/Paginator';
import User from './User';
import { UserSearchForm } from './UserSearchForm';
type QueryParamsType = {
  term?: string;
  page?: string;
  friend?: string;
  count?: string;
};

type UsersType = {
} */

/* export const Users: React.FC<UsersType> = (props) => {

  useEffect(() => {
    dispatch(reqestUser(curruntPage, pageSize, filter));
  }, [])

  const users = useSelector(getUsersSelectorSuper);
  const totalUserCount = useSelector(getTotalUserCount);
  const curruntPage = useSelector(getCurruntPage);
  const pageSize = useSelector(getPageSize);
  const filter = useSelector(getUsersFilter);
  const followingInProgres = useSelector(getFollowingInProgres);
  const dispatch: AppDispatch = useDispatch();

  const location = useLocation();
  useEffect(()=>{

    const queryString = require('query-string');
    const parsed= queryString.parse(location.search) as QueryParamsType ;
    let actualFilter = filter;
    let actualPage = curruntPage;

    if (parsed.page){ actualPage = +parsed.page};
    if (!!parsed.term){ actualFilter = {...actualFilter, term: parsed.term}};
    
    switch(parsed.friend) {
      case 'null': 
      actualFilter = {...actualFilter, friend: null}
        break;
      case 'true': 
      actualFilter = {...actualFilter, friend: true}
        break;
      default: 
      actualFilter = {...actualFilter, friend: false}
    }

    dispatch(reqestUser(actualPage, pageSize, actualFilter));

  }, []);

  const history = useNavigate();
  useEffect(() => {

    const query:QueryParamsType = {};
  

    if (!!filter.term) {query.term = filter.term};
    if (filter.friend !== null) {query.friend = String(filter.friend)};
    if (curruntPage !== 1) {query.page = String(curruntPage)};

    const queryString = require('query-string');
    let queryStrings = queryString.stringify(query);
    history(`/users?` + queryStrings);

  }, [filter, curruntPage, pageSize]);
 
  const onPageChange = (pageNumber: number) => {
    dispatch(reqestUser(pageNumber, pageSize, filter));
  }

  const onFilterChange = (filter: FilterType) => {
    dispatch(reqestUser(1, pageSize, filter));
  }

  const unfollow = (userId: number) => {
    dispatch(unfollows(userId));
  }
  const follow = (userId: number) => {
    dispatch(follows(userId));
  }
  const createChat = (friendId: number) => {
    dispatch(createDiologs(friendId))
  }
  return (
    <div>
      <UserSearchForm onFilterChange={onFilterChange} />
      <Paginator curruntPage={curruntPage} pageSize={pageSize}
        onPageChange={onPageChange} totalUserCount={totalUserCount} />
      <div>
        {
          users.map(u => <User users={u} key={u.id}
            followingInProgres={followingInProgres} unfollow={unfollow} follow={follow} createChat={createChat} />
          )
        }
      </div>

    </div>
  )
}

export default Users; */