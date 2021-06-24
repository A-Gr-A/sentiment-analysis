import logo from './assets/phone.svg';
import './App.css';
import {makeStyles,Button,withStyles,Grid,TextField,CircularProgress,Typography} from '@material-ui/core'
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

  const [display,setDisplay]=useState(0);
  const [result,setResult]=useState('');
  const [data,setData]=useState('');
  let myObj={"text":data};
  const handlechange = e =>{setData(e.target.value)
    console.log(data)}

  const classes = useStyles();

  useEffect(()=>{
    fetch('/api')
    .then(response => response.json());
  },[])

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
       
        <CustomButton variant='contained' color='primary'>Get Sentiment</CustomButton>
        &nbsp;&nbsp;&nbsp;
        <Typography style={{color:'#f9cec3',display:'inline-block',marginLeft:'20px'}}> {display===0?"":display===1? <CircularProgress style={{'color': '#f9cec3'}} size={20}/> :display===2?`${result}`:'SOME VALUES MISSING IN ENTRY'} </Typography>      

      </Grid>

      <Grid item sm={3} xs={12}>
        <img src={logo} alt='sentiment' style={{width:'100%',maxWidth:'500px'}}></img>
      </Grid>
    </Grid>
  );
}

export default App;
