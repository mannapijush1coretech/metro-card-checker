import React from 'react';
import { useEffect, useState,useRef } from 'react';
import './App.css';
import { hasNativeSharingSupport, shareTextToWhatsApp, shareTextViaNativeSharing } from 'share-text-to-whatsapp';
import {Button,TextField,Container,AppBar,Typography,Toolbar, IconButton,BottomNavigationAction, makeStyles,Divider,Fab} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import {SpinnerDotted} from 'spinners-react';
import {CloudDownload, CloudOff, PaymentOutlined,RestoreOutlined, WhatsApp} from '@material-ui/icons'
import {Offline,Online} from 'react-detect-offline'

function App() {

  //Theme init
  const useStyles=makeStyles((theme) =>({
    root:{
      position: "fixed",
      bottom: "0px",
      left: "0px",
      right: "0px",
      width: "100%",
      height: "60px",
      backgroundColor: "#24242D"
    },
    fab:{
      position:'absolute',
      bottom:theme.spacing(8),
      right:theme.spacing(2),
      
    },
    extendIcn:{
      
    }
  }));
  
  const classes=useStyles();
  //Dummy Error Handling JSON
  const waSend={
    message:`
    https://metrocard.itspijush.eu.org
    Kolkata Metro Card Utility - *Check Metro Card Balance*,
    Validity, 
    Last Recharged Details, 
    *Last Travel Details*`,
    title:'Kolkata Metro Card Utility',
    url:'https://metrocard.itspijush.eu.org/'
  };

  const dummyErr={
    "status":1,
    "balance":"N/A",
    "startLocation":"Server / Internet",
    "endLocation":"Error",
    "strValidUpto":"Check internet connection or Try Later !"
  }
  //Data Variable Init
  const txtRef=useRef('');
  const [resdef,setResDef]=useState(false);
  const [isLoading,setIsLoading]=useState('');
  const [cardNo,setCardNo]=useState('');
  const [data,setData]=useState({
    data:'',
    loading:true
  });

  const getCard= async() =>{
    var cardnum=txtRef.current.value;
    setCardNo(cardnum);
    console.log("id -"+cardnum);
    //const res=await fetch(process.env.API_URL+"");
    if(cardnum.length==9){
      setResDef(true);
      setIsLoading(true);
      console.log(cardnum);
      const res=await fetch(process.env.REACT_APP_API_URL+cardnum)
      .then(res=>res.json())
      .then(res=> {setData({
        data:res,
        loading:false
      })})
      .catch(function(error){
        setData({
          data:dummyErr,
          loading:false
        })
      })
      setIsLoading(false);
      console.log(data.data);
    }else{
      
    }
  }
  
  return (
      <div>
      
    <Container maxWidth="sm">
<Online>
      <h1 className="p-2 mt-4 centerTxt h3">Kolkata Metro Card Utility</h1>
        <h3 className="p-2 mt-4 centerTxt h5">Thank your for using Now this is closed</h3>
           <br />
      {!resdef?'':(
        <div className="p-2 fw-normal border border-danger rounded">
          <div >{
          isLoading?(<div className="centerItem"><SpinnerDotted color="#ad0048"/></div>): (
            <div>{
              data.data.balance>=30 && 
                <p className="centerTxt fs-5">Balance - ₹ {data.data.balance}</p>
              }
              {
                data.data.balance<30 &&
                <p className="centerTxt text-danger fs-5">Balance - ₹ {data.data.balance}</p>
              }
              <div className="text-warning">
              Last Journey Details  -
              <br/><p className="text-info centerTxt">
              {data.data.startLocation+" - "+data.data.endLocation}</p><hr></hr>
              </div>
              <div className="text-warning">
              Card Validity Upto -
              <br/><p className="text-info centerTxt">
              {data.data.strValidUpto?data.data.strValidUpto:"Expired or Not found !"}</p><hr></hr>
              
              </div>
              <div className="text-warning">
              Card Last Used on  -
              <br/><p className="text-info centerTxt">
              {data.data.strLastUsedInGateOn?data.data.strLastUsedInGateOn+" at "+data.data.endLocation+" Gate":"Expired or Not found !"}</p><Divider/>
              <br/><Alert severity="success">Balance and other details may vary . Please recheck with station!</Alert>
              </div>
              <br/>
              
            </div>
          )
          }</div>
        
        </div>
      )
      }
      </Online>
      <Offline>
        <br/><center>
        <CloudOff className="m-5 centerItem largeIcon"/>
        <Typography variant="h6">You Are Offline</Typography>
        <p>Check your internet connection !</p>
        </center>
      </Offline>
      
    </Container>
    
    
    </div>
  );
}

export default App;
