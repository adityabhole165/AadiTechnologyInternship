import { Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import LinearWithValueLabel from '../Progress/LinearWithValueLabel'

import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import PauseIcon from '@mui/icons-material/Pause';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
const PrevNextNav = ({ maxLength, index, clickClose, clickPhotoIndex }) => {

    let CurrentIndex = 0
    const [currentIndex, setCurrentIndex] = useState(index)
    const [isPause, setIsPause] = useState(true)
    const [progress, setProgress] = useState(0);
    const onClickClose = () => {
        setIsPause(true);
        clickClose();
    }
    const setPrevNext = (value) => {
        if (isPause)
            CurrentIndex = currentIndex;

        if (value === -1 && CurrentIndex === 0) {
            setCurrentIndex(maxLength)
            CurrentIndex = maxLength
        }
        else if (value === 1 && CurrentIndex === maxLength) {
            setCurrentIndex(0)
            CurrentIndex = 0
        }
        else {
            CurrentIndex = CurrentIndex + value;
            setCurrentIndex(a => a + value)
        }
        clickPhotoIndex(CurrentIndex)
        console.log(CurrentIndex, "-", currentIndex)
    }

    const startTimer = () => {

        setIsPause(false)
    }
    useEffect(() => {
        let count = 0
        CurrentIndex = currentIndex;
        setProgress(0);
        const timer = setInterval(() => {

            if (!isPause) {
                setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 50));
                count += 1;
            }
            if (count === 2) {
                setPrevNext(1);
                count = 0
            }
        }, 1000)
        return () => {
            clearInterval(timer);
        };
    }, [isPause])

    const stopTimer = () => {
        setIsPause(true)
    }
    return (
        <div>
            <Grid container>
                <Grid item xs={12}>
                    <LinearWithValueLabel progress={progress}></LinearWithValueLabel>
                </Grid><Grid item xs={2} justifyContent="right" display="flex">
                    {isPause && <SkipPreviousIcon onClick={() => setPrevNext(-1)} ></SkipPreviousIcon>}
                </Grid><Grid item xs={8} justifyContent="center" display="flex" alignItems="center">
                    {isPause ?
                        <PlayCircleFilledWhiteIcon onClick={startTimer}></PlayCircleFilledWhiteIcon> :
                        <PauseIcon onClick={stopTimer}></PauseIcon>
                    }
                </Grid><Grid item xs={1}>
                    {isPause && <SkipNextIcon onClick={() => setPrevNext(1)}></SkipNextIcon>}
                </Grid><Grid item xs={1} justifyContent="right" display="flex">
                    <HighlightOffIcon onClick={onClickClose} ></HighlightOffIcon>
                </Grid>
            </Grid>
        </div>
    )
}

export default PrevNextNav