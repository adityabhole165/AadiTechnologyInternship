import { Container } from '@mui/material'
import React from 'react'
import 'src/assets/style/Bday.css';


const DashboardBday = () => {

    return (
        <div id="balloon-container">
            <h1>ᕼᗩᑭᑭƳ ᗷᗪᗩƳ</h1>
            <canvas id="birthday"></canvas>
        </div>
    )
}

function random(num) {
    return Math.floor(Math.random() * num)
}

function getRandomStyles() {
    var r = random(255);
    console.log("r",r);
    var g = random(255);
    console.log("g",g);
    var b = random(255);
    console.log("b",b);
    var mt = random(200);
    console.log("mt",mt);
    var ml = random(50);
    console.log("ml",ml);
    var dur = random(5) + 5;
    console.log("dur",dur);
    return `
    background-color: rgba(${r},${g},${b},0.7);
    color: rgba(${r},${g},${b},0.7); 
    box-shadow: inset -7px -3px 10px rgba(${r - 10},${g - 10},${b - 10},0.7);
    margin: ${mt}px 0 0 ${ml}px;
    animation: float ${dur}s ease-in infinite
    `
}

function createBalloons(num) {
    var balloonContainer = document.getElementById("balloon-container")
    for (var i = num; i > 0; i--) {
        var balloon = document.createElement("div");
        balloon.className = "balloon";
        balloon.style.cssText = getRandomStyles(); balloonContainer.append(balloon);
    }
}

window.onload = function () {
    createBalloons(100);
}

export default DashboardBday