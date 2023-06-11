import { TopNav } from "../../components/TopNav/TopNav";
import "./HomePage.css";

export function HomePage() {
    return (
        <>
        <div className="home-page-container">
            <TopNav pageName="Home"/>

            <h1>Home Page</h1>
        </div>
        </>
    )
}