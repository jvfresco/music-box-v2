import React from 'react'
import './ProgressBar.scss';


const ProgressBar = ({ songDuration, currentTime, onProgressBarChange }) => {
  const [currentPercentage, setCurrentPercentage] = React.useState();

  const onPogressBarClickedHandle = (event) => {
    const newCurrentTime =
      (event.clientX * (songDuration / 1000)) / event.target.offsetWidth;
    onProgressBarChange(newCurrentTime);
  };

  React.useEffect(() => {
    setCurrentPercentage(
      ((currentTime * 1000 * 100) / songDuration).toFixed(2)
    );
  }, [currentTime, songDuration]);

  return (
    <div
      className={"ProgressBar"}
      onClick={(e) => onPogressBarClickedHandle(e)}
    >
      <div className={"TimeBar"} style={{ width: currentPercentage + "%" }} />
    </div>
  );
};

export default ProgressBar;