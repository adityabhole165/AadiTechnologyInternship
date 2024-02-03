import { Typography } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'src/assets/style/Bday.css';

var colors = ['#8b5642', '#6a696b'];

const BdayPopUp = () => {
  const StudentName = sessionStorage.getItem('StudentName');
  const navigate = useNavigate();
  useEffect(() => {
    createBalloons(100);
  }, []);
  const clickNav = () => {
    navigate(`/${location.pathname.split('/')[1]}/Student/Birthdays`);
  };
  return (
    <div id="balloon-container" onClick={clickNav}>
      <Typography
        className="header"
        style={{ fontFamily: 'Dancing Script,cursive' }}
      >
        Happy Birthday
      </Typography>
      <Typography
        className="subheader"
        style={{ fontFamily: 'Dancing Script,cursive' }}
      >
        {StudentName}
      </Typography>
      <canvas id="birthday"></canvas>
    </div>
  );
};

function random(num) {
  return Math.floor(Math.random() * num);
}

function getRandomStyles() {
  var r = random(255);
  var g = random(255);
  var b = random(255);
  var mt = random(200);
  var ml = random(600);
  var dur = random(4) + 4;
  return `
    background-color: rgba(${r},${g},${b},0.7);
    color: rgba(${r},${g},${b},0.7); 
    box-shadow: inset -7px -3px 10px rgba(${r - 10},${g - 10},${b - 10},0.7);
    margin: ${mt}px 0 0 ${ml}px;
    animation: float ${dur}s ease-in infinite
    `;
}

function createBalloons(num) {
  var balloonContainer = document.getElementById('balloon-container');
  if (balloonContainer != null) {
    for (var i = num; i > 0; i--) {
      var balloon = document.createElement('div');
      balloon.className = 'balloon';
      balloon.style.cssText = getRandomStyles();
      balloonContainer.append(balloon);
    }
  }
}
window.onload = function () {
  var balloonContainer = document.getElementById('balloon-container');

  createBalloons(100);
};

export default BdayPopUp;
