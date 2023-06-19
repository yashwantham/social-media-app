// Can use this everywhere except on profile page

import "./Avatar.css";

export function Avatar({imgSrc}) {
    return (
        <>
        <img src={imgSrc} alt="" className="avatarimg"/>
        </>
    )
}