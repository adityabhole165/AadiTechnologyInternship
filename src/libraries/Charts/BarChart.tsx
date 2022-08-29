import React from "react";
import Chart from "react-apexcharts";


const BarChart = ({ xData, series, colors }) => {

//     const xData = [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999];
//   const seriesData = [30, 40, 45, 50, 49, 60, 70, 91]
//   const colors = seriesData.map((item)=>{
//     return item===50?'#f48024':'#13d8aa'
//   })
console.log(xData.length)
const height = 
xData.length > 8 ? '200%':
                xData.length > 4 ? '150%' : '100%'
    const data = {
      options: {
        chart: {
          id: "basic-bar"
        },
        legend: {
          show: false
        },
        plotOptions: {
          bar: {
            distributed: true,
            horizontal: true,
          }
        },
        colors: colors,
        xaxis: { categories: xData }
      },
      series: [{ data: series }]
    };
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={data.options}
              series={data.series}
              type="bar"
              width="500"
            height={height}

            />
          </div>
        </div>
      </div>
    )
  }

export default BarChart;
