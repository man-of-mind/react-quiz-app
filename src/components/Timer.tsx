import React, { useEffect, useState } from "react";


interface TimeState {
    time: number;
    seconds: number,
    minute: number
}

interface Props {
    time: number
}

const Timer:React.FC<Props> = ({ time }) => {
    const [state, setState] = useState<TimeState>({
        time,
        seconds: time - Math.floor((time) / 60) * 60,
        minute: Math.floor((time) / 60)
    });

    useEffect(() => {
        setTimeout(() => {
            if(state.time === 0) {
                return;
            }
            setState({
                time: state.time - 1,
                minute: Math.floor((state.time) / 60),
                seconds: state.time - Math.floor((state.time ) / 60) * 60,
            });
        }, 1000);
    }, [state.time]);

    return(
        <h2>
            {`${state.minute} : ${state.seconds < 10 ? `0${state.seconds}` : state.seconds}`}
        </h2>
    );
}


export default Timer;