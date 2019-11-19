import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import SignUp from "../screens/Auth/SignUp"
import Login from "../screens/Auth/Login"
import AuthHome from "../screens/Auth/AuthHome"

const AuthNavigation = createStackNavigator({  
        AuthHome,
        Login, 
        SignUp 
    },
    {
        headerMode: "none"
    }
);

export default createAppContainer(AuthNavigation);