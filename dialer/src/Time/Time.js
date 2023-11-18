import './time.css';
import useTime from './useTime';

function Time() {
    const { time } = useTime();

    return (
        <div className='time'>{ time }</div>
    )
}

export default Time;
