import React,{useState,useEffect} from 'react';
import NormalTitle from '../components/NormalTitle';
import Layout from '../components/Layout';
import PageTitle from '../components/PageTitle';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';
const Events=()=> {
return(
    <Layout pageName='events'/>
);
}
export default Events;