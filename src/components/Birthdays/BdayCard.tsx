import { Box } from '@mui/material';
import 'src/assets/style/BdayCard.css';

const BdayCard = () => {
  const SchoolName = localStorage.getItem('SchoolName');

  return (
    <>
      <Box>
        <div className="cardd">
          <div id="card-front">
            <div className="outside">
              <div className="front">
                <p style={{ fontFamily: 'Dancing Script,cursive' }}>
                  Happy Birthday
                </p>
                <div className="cake">
                  <div className="middle-layer"></div>
                  <div className="bottom-layer"></div>
                  <div className="candle"></div>
                  <div className="fire"></div>
                </div>
                <button id="open">&gt;</button>
              </div>
              <div className="back"></div>
            </div>
            <div className="inside">
              <h2>&#127872;</h2>
              <p style={{ fontFamily: 'Dancing Script,cursive' }}>
                Wishing you another wonderful year of happiness, fun, and
                success. Happy Birthday !!! - From all of us at{' '}
                <b style={{ fontFamily: 'Dancing Script,cursive' }}>
                  {SchoolName}
                </b>
                !!!
              </p>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
};

export default BdayCard;
