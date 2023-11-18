import "./dials.css";
import Dial from "./Dial";

function Dials({ dials }) {
    return (
        <div className="Dials">
            { 
              dials.map( (dialData, index) => {
                return <Dial { ...dialData } key={ index } />
              }) 
            }
        </div>
    );
};

export default Dials;