import React,{useState,useEffect} from 'react';
import NormalTitle from '../components/NormalTitle';
import Layout from '../components/Layout';
import PageTitle from '../components/PageTitle';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';
const Events=()=> {
    const myIPv4  = process.env.REACT_APP_MY_IPV4;
    const base_url = process.env.REACT_APP_BASE_URL;
    const [called,setCalled]=useState(false);
    const[dates,setDates]=useState([]);
    const[events,setEvents]=useState([]);

    const getMonthName = (date)=>{
        const monthNames = ["Jan", "Feb", "March", "April", "May", "June",
        "July", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];  
      const result = new Date(date);
      return `${monthNames[result.getMonth()]} ${date.split("-")[2]}, ${date.split("-")[0]}`;
      }

return(
    <Layout pageName='events'/>
);
}
export default Events;