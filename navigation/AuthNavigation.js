import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import SignUp from "../screens/Auth/SignUp"
import Login from "../screens/Auth/Login"
import AuthHome from "../screens/Auth/AuthHome"

const AuthNavigation = createStackNavigator({  
        SignUp, 
        Login, 
        AuthHome
    },
    {
        headerMode: "none"
    }
);

export default createAppContainer(AuthNavigation);