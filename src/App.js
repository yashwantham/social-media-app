import "./App.css";
import { SideNav } from "./components/SideNav/SideNav";
import { Route, Routes } from "react-router-dom";

import { HomePage } from "./pages/HomePage/HomePage";
import { ExplorePage } from "./pages/ExplorePage/ExplorePage";
import { BookmarksPage } from "./pages/BookmarksPage/BookmarksPage";
import { ProfilePage } from "./pages/ProfilePage/ProfilePage";
import { SuggetionsRightAside } from "./components/SuggetionsRightAside/SuggetionsRightAside";
import { RequiresAuth } from "./utils/RequiresAuth";
import { LoginPage } from "./pages/AuthenticationPages/LoginPage/LoginPage";
import { SignupPage } from "./pages/AuthenticationPages/SignupPage/SignupPage";
import { useContext, useEffect } from "react";
import { AuthContext } from "./contexts/AuthProvider";
import { OthersProfilePage } from "./pages/OthersProfilePage/OthersProfilePage";
import { CreateTweetModal } from "./pages/HomePage/CreateTweetModal";
import { DataContext } from "./contexts/DataProvider";

function App() {

  const { authState } = useContext(AuthContext);
  const { dataState } = useContext(DataContext);

  return (
    <div className="App">

      {/* <RequiresAuth> */}
      {authState.isLoggedin && <SideNav />}
      {/* </RequiresAuth> */}

      {/* Create Tweet Modal */}
      {dataState.modal && <CreateTweetModal/>}

      <Routes>
        <Route
          path="/"
          element={
            <RequiresAuth>
              <HomePage />
            </RequiresAuth>
          }
        />
        <Route
          path="/explore"
          element={
            <RequiresAuth>
              <ExplorePage />
            </RequiresAuth>
          }
        />
        <Route
          path="/bookmarks"
          element={
            <RequiresAuth>
              <BookmarksPage />
            </RequiresAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequiresAuth>
              <ProfilePage />
            </RequiresAuth>
          }
        />
        <Route path={`/profile/:userId`} element={<OthersProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>

      {/* <RequiresAuth> */}
      {authState.isLoggedin && <SuggetionsRightAside />}
      {/* </RequiresAuth> */}
    </div>
  );
}

export default App;
