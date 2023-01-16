
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PetsIcon from '@mui/icons-material/Pets';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    paddingLeft: 10
  },
  green: {
    backgroundColor: "#8fbc8f"
  }
}));

function NavBar( { currentUser, setCurrentUser }) {
  const classes = useStyles();
  const navigate = useNavigate();

function logout() {
fetch('/api/logout', {
  method: 'DELETE',
})
    setCurrentUser(false);
    navigate("/");
}

  function loggedInLinks(){
    return (
      <div>
         <Button color="inherit" to="/" component={ Link }>Home </Button> 
         <Button color="inherit" to="/pets" component={ Link }>My Pets</Button>  
         <Button color="inherit" to="/createPet" component={ Link }>Add Pet</Button>  
           <a href="#" className="logout" onClick={logout}>Logout
           </a> 
      </div>
    )
  }

  function loggedOutLinks(){
    return(
      <div >
          <Button color="inherit" to="/" component={ Link }>Home </Button> 
          <Button color="inherit" to="/login" component={ Link }>Login</Button> 
          <Button color="inherit" to="/signup" component={ Link } >Sign Up</Button> 
      </div>
    )
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.green}>
        <Toolbar>
            <PetsIcon/>
          <Typography variant="h6" className={classes.title}>
              Healthy Pets, Happy Vets!
          </Typography>
          { currentUser ? loggedInLinks() :  loggedOutLinks()}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;