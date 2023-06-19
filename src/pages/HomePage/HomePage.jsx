import { TopNav } from "../../components/TopNav/TopNav";
import "./HomePage.css";
import { AllPostList } from "./HomePageComponents/AllPostsList/AllPostsList";

export function HomePage() {
    return (
        <>
        <div className="home-page-container">
            <TopNav pageName="Home"/>

            <h1>Home Page</h1>

            <AllPostList/>
        </div>
        </>
    )
}