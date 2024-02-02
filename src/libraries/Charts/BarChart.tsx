import Chart from 'react-apexcharts';

const BarChart = ({
  xData,
  series,
  colors,
  dataLabel,
  formatToolTip,
  Isgrade
}) => {
  //     const xData = [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999];
  //   const seriesData = [30, 40, 45, 50, 49, 60, 70, 91]
  //   const colors = seriesData.map((item)=>{
  //     return item===50?'#f48024':'#13d8aa'
  //   })

  const height =
    xData.length == 1
      ? '100rem'
      : xData.length == 2
      ? '125rem'
      : xData.length == 3
      ? '150rem'
      : xData.length == 4
      ? '200rem'
      : xData.length == 5
      ? '225rem'
      : xData.length == 6
      ? '225rem'
      : xData.length == 7
      ? '400rem'
      : xData.length == 8
      ? '300rem'
      : xData.length == 9
      ? '400rem'
      : xData.length == 10
      ? '300rem'
      : '200rem';
  const data = {
    options: {
      tooltip: {
        enabled: Isgrade.trim() !== 'true',
        y: {
          formatter: function (val, opts) {
            return formatToolTip(val, opts);
          }
        }
      },
      chart: {
        toolbar: { show: false },
        id: 'basic-bar',
        background: '#FFFFFF'
      },
      legend: { show: false },
      dataLabels: {
        formatter: function (val, opts) {
          return dataLabel(val, opts);
        },
        style: {
          colors: ['black'],
          color: '#000000',
          fontFamily: 'Roboto',
          fontWeight: 600,
          fontSize: '10px'
        }
      },
      plotOptions: {
        bar: {
          distributed: true,
          horizontal: true
        }
      },
      colors: colors,
      xaxis: {
        categories: xData,
        labels: {
          show: false
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: ['#000000'],
            fontSize: '10px',
            color: 'black',
            fontFamily: 'Roboto',
            fontWeight: 600
          }
        }
      }
    },
    series: [
      {
        name: 'Marks',
        data: series
      }
    ]
  };
  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={data.options}
            series={data.series}
            type="bar"
            width="100%"
            height={height}
          />
        </div>
      </div>
    </div>
  );
};
export default BarChart;
