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
      const getEvents = ()=>{


        const header = {
          headers: { Authorization: `Bearer ${secureLocalStorage.getItem("token")}` }
        };
          if (!called){
               axios.get(`${base_url}get_events`,header)
              .then(function (response) {
                if(response.data.data.length !==0){
                  const formatter = new Intl.DateTimeFormat("en-GB", {
                    hour:'2-digit',
                    minute:'2-digit',
                    second:'2-digit',
                    hour12: true
                  });
                  const array_dates = [];
                  const sub_array_event_details=[];
                  response.data.data.forEach(element => {
                    const temp_array=[];
                    array_dates.push(getMonthName(element.date));
                    element.events.forEach(subElement=>{
                      temp_array.push(formatter.format(Date.parse(subElement.arrival_time)));
                      if(subElement.departure_time!=null)
                        temp_array.push(formatter.format(Date.parse(subElement.departure_time)));
                      else{
                        temp_array.push(null);
                      }  
                      temp_array.push(subElement.difference);
                      temp_array.push(subElement.user.username);
                        if(subElement.user.profile_url!==null){
                          let profile_url = subElement.user.profile_url.substring(subElement.user.profile_url.indexOf("\\let-me-in\\"));
                          profile_url = myIPv4+profile_url;
                          profile_url = profile_url.replace(/\\/g,"/");
                          temp_array.push(profile_url);
                      }else{
                        temp_array.push(subElement.user.profile_url);
                      }
      
                      temp_array.push(subElement.user.user_detail.car_type);
                      temp_array.push(subElement.user.user_detail.car_plate_number);
                      
                    });
                    sub_array_event_details.push(temp_array);
                    
                   
                  });
    
                  const array1=[];
                  let array2 = [];
                  let array3=[];

                  for(let i=0;i<array_dates.length;i++){
                    let counter =0;
                    while(counter<sub_array_event_details[i].length){
                      array3.push(sub_array_event_details[i][counter]);

                      if((counter+1)%7===0){
                        array2.push(array3);
                        array3=[];
                      }
    
                      counter++;
                    }
                    array1.push(array2);
                    array2=[];
                    array3=[]; 
                  }
      
                  setDates(array_dates);
                  setEvents(array1);
                }
            })
            .catch(function (error) {
            });
          
            setCalled(true);
          }
         
          }
          useEffect( () => {getEvents();});
        

return(
    <Layout pageName='events'/>
);
}
export default Events;