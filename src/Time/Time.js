import './time.css';
import useTime from './useTime';

function Time() {
    const { time } = useTime();

    return (
        <div className='time'><p>{ time }</p></div>
    )
}

export default Time;
