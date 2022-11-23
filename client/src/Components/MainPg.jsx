import { getRadioUtilityClass } from "@mui/material";


const MainPg = () => {

    const myStyles = {
        backgroundImage: `url("https://user-images.githubusercontent.com/91993983/203647488-68f8e164-1def-4f46-aeb5-ea49ce683c76.jpeg")`,
        height:'100vh',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        paddingLeft: 40,
        paddingTop: 40.
    }
    return (
        

        <div style={myStyles} className="largeText"> 
            No matter the pet, 
            <br/>
            We are here to help 
            <br/>
            keep track of their 
            <br/> 
            health!
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <div className="smallText">
            Signup or Login to begin!
            </div>
          
          </div>

    )
}

export default MainPg;