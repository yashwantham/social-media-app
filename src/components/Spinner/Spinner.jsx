import { BeatLoader } from "react-spinners";
import "./Spinner.css";

export function Spinner() {
    return (
        <>
            <div className="spinner">
                <BeatLoader
                    color={"#000000"}
                    // loading={loading}
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        </>
    )
}