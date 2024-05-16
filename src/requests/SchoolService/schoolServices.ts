import axios from 'axios';

export default axios.create({
  // baseURL: "http://192.168.1.53:81/",
  baseURL: 'http://api.aaditechnology.info/',

  // baseURL: "http://localhost:44307/",
  // baseURL: "http://schoolappapi.aaditechnology.com/",
  // baseURL: "https://mobileappapi.regulusit.net/",
  // baseURL: "https://riteschoolmobileservicehttpsnewui.riteschool.com",
  //baseURL: "https://schooltempapi.riteschool.com/",
  // baseURL: "http://192.168.1.80:85/",
  //  baseURL: "http://schoolapp.aaditechnology.com/MobileService.svc/",
  headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
});
