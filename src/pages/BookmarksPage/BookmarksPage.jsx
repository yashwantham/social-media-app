import { TopNav } from "../../components/TopNav/TopNav";
import "./BookmarksPage.css";

export function BookmarksPage() {
    return (
        <>
        <div className="bookmarks-page-container">
            <TopNav pageName={"Bookmarks"}/>
            <h1>Bookmarks Page</h1>
        </div>
        </>
    )
}