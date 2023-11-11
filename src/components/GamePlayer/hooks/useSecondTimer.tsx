import { useEffect, useState } from 'react';

const useSecondTimer = (endCountDownDate: number) => {

  const [countdown, setCountdown] = useState(endCountDownDate - new Date().getTime());

  useEffect(() => {

    const updateCountdown = () => {
      const remaining = endCountDownDate - new Date().getTime();
      setCountdown(remaining);
    }

    if (countdown > 0) {
      setTimeout(() => {
        updateCountdown();
      }, 77);
    }
    else {
      setCountdown(0);
    }

    return;
  }, [countdown, endCountDownDate]);

  return countdown;
};

export default useSecondTimer;
