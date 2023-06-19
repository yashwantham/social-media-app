import "./TopNav.css";

export function TopNav({pageName}) {
    return (
        <>
            <div className="topnav-container">
                <div className="page-title">
                    {pageName}
                </div>
                {pageName === "Home" && (
                    <div className="trending-latest-container">
                        <div className="latest">
                            Latest
                        </div>
                        <div className="trending">
                            Trending
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}