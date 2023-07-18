import { useContext, useState } from "react";
import "./VerifiedModal.css";
import ReactDOM from "react-dom";
import { DataContext } from "../../contexts/DataProvider";
import { ACTIONS } from "../../reducers/DataRedcuer";
import { ACTIONS as AUTHACTIONS } from "../../reducers/AuthRedcuer";
import { AuthContext } from "../../contexts/AuthProvider";
import { successToastmessage } from "../Toastmessage/successToastmessage";

export function VerifiedModal() {

    const { SET_USERSLIST, TOGGLE_VERIFIEDMODAL } = ACTIONS;

    const { SET_USER_DATA } = AUTHACTIONS;

    const [selectedBox, setSelectedbox] = useState({ individual: true, organization: false })

    const { dataState, dispatchData } = useContext(DataContext);
    const { authState, dispatchAuth } = useContext(AuthContext)

    const subscribeHandler = () => {
        const newUserList = dataState.usersList.map((user) => user.username === authState.userData.username ? { ...user, verified: true } : user)
        const newUserData = { ...authState.userData, verified: true }
        dispatchData({ type: SET_USERSLIST, payload: newUserList });
        dispatchAuth({ type: SET_USER_DATA, payload: newUserData });
        dispatchData({ type: TOGGLE_VERIFIEDMODAL });
        successToastmessage("Subscribed for verified user!");
    }
    
    const unSubscribeHandler = () => {
        const newUserList = dataState.usersList.map((user) => user.username === authState.userData.username ? { ...user, verified: false } : user)
        const newUserData = { ...authState.userData, verified: false }
        dispatchData({ type: SET_USERSLIST, payload: newUserList });
        dispatchAuth({ type: SET_USER_DATA, payload: newUserData });
        dispatchData({ type: TOGGLE_VERIFIEDMODAL });
        successToastmessage("Unsubscribed from verification!");
    }

    return ReactDOM.createPortal(
        <>

            <div className="verified-overlay" onClick={() => dispatchData({ type: TOGGLE_VERIFIEDMODAL })}></div>

            <div className="verified-modal">
                {!authState.userData.verified ? (
                    <div className="notverified-yet-container">
                        <div className="close-vm" onClick={() => dispatchData({ type: TOGGLE_VERIFIEDMODAL })}><i class="fa-solid fa-xmark"></i></div>
                        <div className="app-logo-vm">
                            ConnectVerse
                        </div>
                        <div className="wru-container">
                            <h1 className="wru">Who are you?</h1>
                        </div>
                        <div className="veri-modal-msg-container">
                            <p className="veri-modal-msg">Choose the right Verified subscription for you:</p>
                        </div>
                        <div className="indi-org-boxes-container">
                            <div className="individual-box-container twb-mr" style={{ border: selectedBox.individual ? "2px solid rgb(29, 155, 240)" : "none" }} onClick={() => setSelectedbox({ ...selectedBox, individual: true, organization: false })}>
                                <span>Twitter Blue</span>
                                <span className="to-sel-indorg">I am an individual</span>
                                <span>For individuals and creators</span>
                            </div>
                            <div className="individual-box-container" style={{ border: selectedBox.organization ? "2px solid rgb(29, 155, 240)" : "none" }} onClick={() => setSelectedbox({ ...selectedBox, individual: false, organization: true })}>
                                <span>Verified Organizations</span>
                                <span className="to-sel-indorg">I am an organization</span>
                                <span>For businesses, government agencies, and non-profits</span>
                            </div>
                        </div>
                        <div className="subscribe-btn-container">
                            <button className="subscribe-btn" onClick={subscribeHandler}>Subscribe</button>
                        </div>
                    </div>
                ) : (
                    <div className="already-verified-container">
                        <div className="close-vm" onClick={() => dispatchData({ type: TOGGLE_VERIFIEDMODAL })}><i class="fa-solid fa-xmark"></i></div>
                        <div className="app-logo-vm">
                            ConnectVerse
                        </div>
                        <div className="wru-container">
                            <h1 className="wru">You are already subscribed!</h1>
                        </div>
                        <div className="veri-modal-msg-container">
                            <p className="veri-modal-msg">You can unsubscribe by clicking below:</p>
                        </div>
                        <div className="subscribe-btn-container">
                            <button className="subscribe-btn" onClick={unSubscribeHandler}>Unsubscribe</button>
                        </div>

                    </div>
                )}
            </div>

        </>, document.getElementById("portal")
    )
}