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
    
return(
    <Layout pageName='events'/>
);
}
export default Events;