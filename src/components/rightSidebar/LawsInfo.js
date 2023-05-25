import { FaBalanceScale } from "react-icons/fa";

const LawsInfo = ({
    setView
}) => {
    return ( 
        <div className="LawsInfo">
            <div className="viewHeader">
                <div className="viewTitle">
                    <FaBalanceScale />
                    <h3>Local Laws</h3>
                </div>
                <button className="backButton" onClick={() => setView("main")}>Back</button>
            </div>
        </div>
     );
}
 
export default LawsInfo;