import React,{useRef,useState} from 'react';
import Button from '../components/Button';
import { useNavigate } from "react-router-dom";
import Form from '../components/Form';
import Title from '../components/Title';
import Label from '../components/Label';
import Checkbox from '../components/Checkbox';
import Text from '../components/Text';
import PopupDeny from '../components/PopupDeny';
import axios from 'axios';  
import  secureLocalStorage  from  "react-secure-storage";