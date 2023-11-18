import useTime from './useTime';

function Time() {
    const { time } = useTime();

    return (
        <div>{ time }</div>
    )
}

export default Time;
