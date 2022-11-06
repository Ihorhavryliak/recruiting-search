import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import './App.css';
import { Footer } from './pages/Footer';
import { Header } from './pages/Header';
import { InformationUsers } from './pages/InformationUsers';
import { ListUsersBlock } from './pages/ListUsersBlock';
import { SearchBlock } from './pages/SearchBlock';


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

const App = React.memo(() => {
  let rightUrl = useLocation();
  const queryString = require('query-string');
  const parsed = queryString.parse(rightUrl.search)['seartch'];
  console.log(parsed)

  const searchName = parsed
  const [serchTerm, setSerchTerm] = useState(searchName);
  const [selecUser, setSelecUser] = useState<SearchUserType | null>(null);
  const [isLoad, setLoad] = useState(false);
  const [isLoadSearch, setLoadSearch] = useState(false);



  useEffect(() => {
    console.log('title')
    if (selecUser) {
      document.title = selecUser.login;
    }
  }, [selecUser]);

  return (<div className='mainContainer'>
    <Header />
    <div className='block'>
    <div className='blockLeft'>
      <SearchBlock value={serchTerm} onSubmit={(value: string) => { setSerchTerm(value) }} isLoadSearch={isLoadSearch}  />
      <ListUsersBlock serchTerm={serchTerm} selecUser={selecUser} onUserSelect={setSelecUser} 
      setLoadSearch={setLoadSearch} isLoad={isLoadSearch}  />
      </div>
      <div className='blockRight'> 
      <InformationUsers user={selecUser} setLoad={setLoad} isLoad={isLoad} />
      </div>
    </div>
    <Footer />
    </div>
  );
})

export default App;
