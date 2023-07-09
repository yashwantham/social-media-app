import ReactDOM from "react-dom";

import "./EditProfileDetailsModal.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faXmark } from "@fortawesome/free-solid-svg-icons";
import { ACTIONS } from "../../reducers/AuthRedcuer";
import { ACTIONS as dataACTIONS } from "../../reducers/DataRedcuer";
import { DataContext } from "../../contexts/DataProvider";

export function EditProfileDetailsModal({ setEditprofdmodal }) {

    const { SET_USER_DATA } = ACTIONS;
    const {UPDATE_USERLIST} = dataACTIONS;

    const { authState, dispatchAuth } = useContext(AuthContext);
    const { dispatchData } = useContext(DataContext);

    const [profiledetails, setProfiledetails] = useState({ ...authState.userData });
    const [showOptionsModal, setShowOptionsModal] = useState(false);
    const [showavatarslistbox, setShowavatarslistbox] = useState(false);
    const [newAvatarSelected, setNewAvatarSelected] = useState(false)

    const changeHandler = (e) => setProfiledetails((profiledetails) => ({ ...profiledetails, [e.target.name]: e.target.value }))

    const profileDetailsSaver = () => {
        dispatchAuth({ type: SET_USER_DATA, payload: profiledetails });
        dispatchData({ type: UPDATE_USERLIST, payload: profiledetails });
        setEditprofdmodal(false);
    }

    const avatarSelectHandler = (e) => {
        setNewAvatarSelected(true);
        setProfiledetails((profiledetails) => ({ ...profiledetails, avatar: e.target.src }));
    }

    const setAvatarClickHandler = () => {
        setShowOptionsModal(!showOptionsModal)
        setShowavatarslistbox(!showavatarslistbox)
    }

    const avatarImageUploadHandler = (e) => {
        // console.log(e.target.files[0]);
        setNewAvatarSelected(true);
        const imageUrl = URL.createObjectURL(e.target.files[0]);
        // console.log({imageUrl})
        setProfiledetails((profiledetails) => ({ ...profiledetails, avatar: imageUrl }))
    }

    return ReactDOM.createPortal(
        <>
            <div className="editprofile-overlay" onClick={() => setEditprofdmodal(false)}></div>
            <div className="editprofiledetails-modal">
                <div className="editheading-container-editpd">
                    <div className="close-n-head">
                        <div className="closemodal-editpd" onClick={() => setEditprofdmodal(false)}>
                            <FontAwesomeIcon icon={faXmark} className="closeicon-editpd" />
                        </div>
                        <div className="edithead-editdp">
                            Edit profile
                        </div>
                    </div>
                    <div className="save-btn-container-editpd">
                        <button className="save-btn-editpd" onClick={profileDetailsSaver}>Save</button>
                    </div>
                </div>
                <div className="header-container-editpd">
                    {authState.userData?.header?.length !== 0 && <img src={authState.userData.header} alt="" className="header-editpd" />}
                </div>
                <div className="profiledetails-avatar-inputfields-container-editpd">
                    <div className="avatar-pp-container-editpd">
                        <img src={newAvatarSelected ? profiledetails.avatar : authState.userData.avatar} alt="" className="avatart-pp-editpd" />
                        <div className="camera-icon-container" onClick={() => setShowOptionsModal(!showOptionsModal)}>
                            <FontAwesomeIcon icon={faCamera} className="camera-icon" />
                            {/* <input type="file" id="avatar-input" name="avatar-input" /> */}
                        </div>
                    </div>
                    <div className="avatars-choose-container">
                        {showOptionsModal && <div className="options-modal-container">
                            <div className="options-overlay" onClick={() => setShowOptionsModal(!showOptionsModal)}></div>
                            <div className="options-modal">
                                <div className="option" onClick={setAvatarClickHandler}>Set an avatar</div>
                                <div className="option">
                                    <label htmlFor="upload-avatar">Upload Image</label>
                                    <input type="file" name="" id="upload-avatar" className="avatar-input" onChange={avatarImageUploadHandler}/>
                                </div>
                            </div>
                        </div>}
                        {showavatarslistbox && (<div className="avatars-list-container">
                            <div className="avatar1"><img src="https://res.cloudinary.com/ddqytua2y/image/upload/v1688907827/ruojzxiht9b3evnni3se.png" alt="" className="avatar-img-toselect" onClick={avatarSelectHandler} /></div>
                            <div className="avatar2"><img src="https://res.cloudinary.com/ddqytua2y/image/upload/v1688907936/zxy1m0pbghav1ncay2vs.png" alt="" className="avatar-img-toselect" onClick={avatarSelectHandler} /></div>
                            <div className="avatar3"><img src="https://res.cloudinary.com/ddqytua2y/image/upload/v1688907868/rfii2owntuc8urvwimyz.png" alt="" className="avatar-img-toselect" onClick={avatarSelectHandler} /></div>
                            <div className="avatar4"><img src="https://res.cloudinary.com/ddqytua2y/image/upload/v1688907919/uuzmsqu4rwn8a9hzhrqh.png" alt="" className="avatar-img-toselect" onClick={avatarSelectHandler} /></div>
                            <div className="avatar5"><img src="https://res.cloudinary.com/ddqytua2y/image/upload/v1688907889/zb6vcmmmli0rlrmkjvvu.png" alt="" className="avatar-img-toselect" onClick={avatarSelectHandler} /></div>
                            <div className="avatar6"><img src="https://res.cloudinary.com/ddqytua2y/image/upload/v1688907926/pybrjoh1v8hd39gja2vr.png" alt="" className="avatar-img-toselect" onClick={avatarSelectHandler} /></div>
                            <div className="avatar7"><img src="https://res.cloudinary.com/ddqytua2y/image/upload/v1688150690/Social-media-app-assets/default_profile_400x400_fvaubd.png" alt="" className="avatar-img-toselect" onClick={avatarSelectHandler} /></div>
                            <div className="closeavatarbox" onClick={() => setShowavatarslistbox(!showavatarslistbox)}>
                                <FontAwesomeIcon icon={faXmark} />
                            </div>
                        </div>)}
                    </div>
                    <div className="inputfields-container">
                        <div className="name-input-container-editpp ipcontainers">
                            <div>First name</div>
                            <input type="text" className="name-input-editpp" value={profiledetails.firstName} name="firstName" onChange={changeHandler} />
                        </div>
                        <div className="name-input-container-editpp ipcontainers">
                            <div>Last name</div>
                            <input type="text" className="name-input-editpp" value={profiledetails.lastName} name="lastName" onChange={changeHandler} />
                        </div>
                        <div className="bio-input-container-editpp ipcontainers" name="bio" onChange={changeHandler}>
                            <div>Bio</div>
                            <textarea id="" className="bio-input-editpp" value={profiledetails.bio} name="bio" onChange={changeHandler}></textarea>
                        </div>
                        <div className="location-input-container-editpp ipcontainers">
                            <div>Location</div>
                            <input type="text" className="location-input-editpp" value={profiledetails.location} name="location" onChange={changeHandler} />
                        </div>
                        <div className="website-input-container-editpp ipcontainers">
                            <div>Website</div>
                            <input type="text" className="website-input-editpp" value={profiledetails.website} name="website" onChange={changeHandler} />
                        </div>
                    </div>
                </div>
            </div>
        </>, document.getElementById("portal")
    )
}