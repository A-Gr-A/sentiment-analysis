import logo from './assets/phone.svg';
import './App.css';
import {makeStyles,Button,withStyles,Grid,TextField,Typography} from '@material-ui/core'
import {useEffect,useState} from 'react'

function App() {
  const useStyles = makeStyles({
    root: {
      '& label.Mui-focused': {
        color: '#f9cec3 ',
      },
      
      '& label':{
        color: 'rgba(249, 206, 195, 0.5)'
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'green',
      },
      "& .MuiFilledInput-root":{
        color:"#f9cec3"
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'rgba(249, 206, 195, 0.5)',
        },
        '&:hover fieldset': {
          borderColor: '#f9cec3',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#f9cec3',
        },    
      },
      '& .MuiOutlinedInput-input': {
        color:'#f9cec3'      
      },  
    }
  });
  
  const CustomButton = withStyles((theme) => ({
    root: {
      color: "f9cec3",
      backgroundColor: "#d4516f",
      "&:hover": {
        backgroundColor: "rgba(212, 81, 111, 0.7)",
        color: '#f9cec3',
      }
    }
  }))(Button);

  // const [display,setDisplay]=useState(0);
  const [result,setResult]=useState('');
  const [data,setData]=useState('');
  // let myObj={"text":data};
  const handlechange = e =>{
    console.log(`typed => ${e.target.value}`)
    setData(e.target.value)
  }

  const classes = useStyles();

  useEffect(()=>{
    console.log('App re-rendered');
    fetch('/api').then(
      response => response.json()
    ).then(
      jsonified => console.log(jsonified)
    ).catch(
      e=>console.log(e)
    )
  },[])
  
  async function sendData(){
    let myObj ={'text':data}
    try{
      await fetch('/api',{
        method:"POST",
        headers:{
          'Accept':'application/json',
          'Content-type':'application/json',
        },
        body: JSON.stringify(myObj)
      })
      .then(
        response => response.json()
      )
      .then(
        jsonified =>{ console.log(jsonified)
        setResult(jsonified['result'])
        })
    }
    catch(e){
      console.log(e)
    }
    
  }

  return (
    <Grid className="app-container"
     direction='row'
     justify='space-evenly' 
     spacing={5} 
     container>
       <Grid item xs={12}>
       <h1 style={{color:'#f9cec3',marginTop:'0px',width:'100%',textAlign:'center'}}>AGrA</h1>
       </Grid>

      <Grid item sm={4} xs={12}> 

        <TextField 
        style={{width:"100%"}}
        className={classes.root}
        onChange={handlechange}
        label='Enter your review here' value={data} multiline  variant='outlined'/>
        
        <br/><br/>
       
        <CustomButton onClick={()=>{sendData()}} variant='contained' color='primary'>Get Sentiment</CustomButton>
        &nbsp;&nbsp;&nbsp;
        <Typography style={{color:'#f9cec3',display:'inline-block',marginLeft:'20px'}}>{result}</Typography>      

      </Grid>

      <Grid item sm={3} xs={12}>
        <img src={logo} alt='sentiment' style={{width:'100%',maxWidth:'500px'}}></img>
      </Grid>
    </Grid>
  );
}

export default App;
