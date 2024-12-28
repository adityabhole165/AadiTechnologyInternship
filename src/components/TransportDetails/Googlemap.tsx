import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useEffect, useState } from 'react';

const containerStyle = {
  width: '100%',
  height: '800px'
};
const Googlemap = () => {
  const center = { lat: 18.585592, lng: 73.776219 };
  const latLong = [
    { lat: 17.555893, lng: 78.396255 },
    {
      lat: 17.555138,
      lng: 78.395805
    },
    {
      lat: 17.55414,
      lng: 78.395302
    },
    {
      lat: 17.554087,
      lng: 78.394844
    },
    {
      lat: 17.554113,
      lng: 78.394135
    },
    {
      lat: 17.553637,
      lng: 78.393852
    },
    {
      lat: 17.553062,
      lng: 78.39341
    },
    {
      lat: 17.552475,
      lng: 78.393005
    },
    {
      lat: 17.551847,
      lng: 78.392548
    },
    {
      lat: 17.551147,
      lng: 78.392136
    },
    {
      lat: 17.550484,
      lng: 78.391907
    },
    {
      lat: 17.54969,
      lng: 78.391685
    },
    {
      lat: 17.549046,
      lng: 78.391556
    },
    {
      lat: 17.548338,
      lng: 78.39109
    },
    {
      lat: 17.547634,
      lng: 78.390732
    },
    {
      lat: 17.546812,
      lng: 78.390579
    },
    {
      lat: 17.546188,
      lng: 78.390366
    },
    {
      lat: 17.545527,
      lng: 78.390099
    },
    {
      lat: 17.544748,
      lng: 78.389748
    },
    {
      lat: 17.543898,
      lng: 78.389412
    },
    {
      lat: 17.543037,
      lng: 78.389069
    },
    {
      lat: 17.542156,
      lng: 78.388725
    },
    {
      lat: 17.541817,
      lng: 78.388573
    },
    {
      lat: 17.541632,
      lng: 78.388557
    },
    {
      lat: 17.541573,
      lng: 78.38871
    },
    {
      lat: 17.541468,
      lng: 78.389427
    },
    {
      lat: 17.541307,
      lng: 78.390511
    },
    {
      lat: 17.54114,
      lng: 78.391571
    },
    {
      lat: 17.540977,
      lng: 78.392517
    },
    {
      lat: 17.540869,
      lng: 78.393127
    },
    {
      lat: 17.540855,
      lng: 78.393372
    },
    {
      lat: 17.540846,
      lng: 78.393806
    },
    {
      lat: 17.540802,
      lng: 78.393883
    },
    {
      lat: 17.540693,
      lng: 78.393692
    },
    {
      lat: 17.540815,
      lng: 78.392982
    },
    {
      lat: 17.540932,
      lng: 78.392357
    },
    {
      lat: 17.541098,
      lng: 78.391304
    },
    {
      lat: 17.541309,
      lng: 78.390099
    },
    {
      lat: 17.541496,
      lng: 78.38887
    },
    {
      lat: 17.541178,
      lng: 78.388603
    },
    {
      lat: 17.540201,
      lng: 78.38855
    },
    {
      lat: 17.539133,
      lng: 78.388245
    },
    {
      lat: 17.537893,
      lng: 78.388161
    },
    {
      lat: 17.53673,
      lng: 78.38797
    },
    {
      lat: 17.535889,
      lng: 78.387924
    },
    {
      lat: 17.535675,
      lng: 78.387871
    },
    {
      lat: 17.53517,
      lng: 78.387581
    },
    {
      lat: 17.534222,
      lng: 78.387192
    },
    {
      lat: 17.533306,
      lng: 78.387016
    },
    {
      lat: 17.532248,
      lng: 78.386749
    },
    {
      lat: 17.53167,
      lng: 78.386536
    },
    {
      lat: 17.531412,
      lng: 78.386414
    },
    {
      lat: 17.531103,
      lng: 78.38636
    },
    {
      lat: 17.530886,
      lng: 78.386253
    },
    {
      lat: 17.530602,
      lng: 78.386055
    },
    {
      lat: 17.530268,
      lng: 78.385803
    },
    {
      lat: 17.529434,
      lng: 78.385513
    },
    {
      lat: 17.5289,
      lng: 78.385231
    },
    {
      lat: 17.528786,
      lng: 78.384483
    },
    {
      lat: 17.528677,
      lng: 78.38356
    },
    {
      lat: 17.528105,
      lng: 78.38298
    },
    {
      lat: 17.52726,
      lng: 78.38298
    },
    {
      lat: 17.526859,
      lng: 78.382614
    },
    {
      lat: 17.526934,
      lng: 78.381775
    },
    {
      lat: 17.527067,
      lng: 78.38118
    },
    {
      lat: 17.526731,
      lng: 78.380608
    },
    {
      lat: 17.526344,
      lng: 78.379974
    },
    {
      lat: 17.52599,
      lng: 78.379593
    },
    {
      lat: 17.525593,
      lng: 78.379341
    },
    {
      lat: 17.525162,
      lng: 78.379135
    },
    {
      lat: 17.524883,
      lng: 78.378998
    },
    {
      lat: 17.524515,
      lng: 78.378761
    }
  ];

  const [count, setCount] = useState(0);
  const [latLonG, setlatLonG] = useState(latLong[count]);
  const [count1, setCount1] = useState(0);
  const [latLonG1, setlatLonG1] = useState(latLong[count1]);

  //console.log(latLonG);
  //console.log(count);
  //console.log(latLonG1);
  //console.log(count1);
  useEffect(() => {
    // console.log(latLonG)
    //Implementing the setInterval method
    setlatLonG(latLong[count]);
    const interval = setInterval(() => {
      // console.log(latLonG, "--", latLong.length, "--", latLong[count])

      if (count < latLong.length) setCount(count + 1);
      else setCount(0);
    }, 2000);

    //Clearing the interval
    return () => clearInterval(interval);
  }, [count]);
  useEffect(() => {
    // console.log(latLonG)
    //Implementing the setInterval method
    setlatLonG1(latLong[count1]);
    const interval = setInterval(() => {
      // console.log(latLonG, "--", latLong.length, "--", latLong[count])

      if (count1 < latLong.length) setCount1(count1 + 5);
      else setCount1(0);
    }, 5000);

    //Clearing the interval
    return () => clearInterval(interval);
  }, [count1]);
  return (
    <>
      <LoadScript googleMapsApiKey="AIzaSyBb1LIy9ZoMzcukFXNR8uxaFuEv7qEUBGk">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={latLonG1}
          zoom={15}
        >
          <Marker position={latLonG} />
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default Googlemap;
