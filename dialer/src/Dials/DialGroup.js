import "./dials.css";
import Dial from "./Dial";

function DialGroup({ groupDials }) {
    return (
        <div className="Dials">
            { 
              groupDials.map( (dialData, index) => {
                return <Dial { ...dialData } key={ index } />
              }) 
            }
        </div>
    );
};

export default DialGroup;