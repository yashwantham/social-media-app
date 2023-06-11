
import './App.css';
import { TopNav } from './components/TopNav/TopNav';
import { SideNav } from './components/SideNav/SideNav';
import { Route, Routes } from 'react-router-dom';

import {HomePage} from "./pages/HomePage/HomePage";
import {ExplorePage} from "./pages/ExplorePage/ExplorePage";
import { BookmarksPage } from './pages/BookmarksPage/BookmarksPage';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { SuggetionsRightAside } from './components/SuggetionsRightAside/SuggetionsRightAside';

function App() {
  return (
    <div className="App">
      {/* <TopNav/> */}
      <SideNav/>

      <Routes>
        <Route path="/" element={ <HomePage/> }/>
        <Route path="/explore" element={<ExplorePage/>} />
        <Route path="/bookmarks" element={<BookmarksPage/>} />
        <Route path="/profile" element={<ProfilePage/>} />
      </Routes>

      <SuggetionsRightAside/>

    </div>
  );
}

export default App;
