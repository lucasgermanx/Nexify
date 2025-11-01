import { useEffect, useState } from 'react';

import LoadingBar from 'react-top-loading-bar';

const ProgressBarComponent = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (progress < 100) {
        setProgress(prevProgress => prevProgress + 5);
      } else {
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [progress]);

  return (
    <LoadingBar
      color='#f11946'
      progress={progress}
    />
  );
};

export default ProgressBarComponent;
