import useSecondTimer from '../hooks/useSecondTimer';
import countdownAudio from '../audio/countdown.mp3';
import React, { useState, useEffect } from 'react';

const CountDownTimer: React.FC<{ endGame: () => void; endTime: number }> = (props) => {

    const countdown = useSecondTimer(props.endTime);
    const isFinalSeconds = countdown < 8000;
    const [audio] = useState(new Audio(countdownAudio));

    useEffect(() => {
        if (countdown <= 0)
            props.endGame();
        else if (isFinalSeconds && audio.paused) {
            audio.play()
        }
    }, [audio, isFinalSeconds, props, countdown]
    );

    return <>
        <div className={isFinalSeconds ? "counterFinal" : "counterStandard"}>Remaining:{Math.floor(countdown / 60000).toString().padStart(2, '0')}:{((countdown % 60000) / 1000).toFixed(2).toString().padStart(5, '0')}</div>
    </>;
}

export default CountDownTimer;
