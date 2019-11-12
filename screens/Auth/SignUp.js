import React, {useState} from "react";
import {TouchableWithoutFeedback, Keyboard} from 'react-native';
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import {Alert} from 'react-native';
import { CREATE_ACCOUNT } from "./AuthQueries";
import { useMutation } from "react-apollo-hooks";
import * as Facebook from 'expo-facebook';

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const FBContainer = styled.View`
  margin-top: 10px;
  padding-top: 10px;
  border-top-width: 1px;
  border-top-color: ${props => props.theme.lightGreyColor};
  border-style: solid;
`;


export default ({navigation}) => {
  const emailInput = useInput(navigation.getParam("email", ""));
  const passwordInput = useInput("");
  const firstNameInput = useInput("");
  const lastNameInput = useInput("");
  const userNameInput = useInput(""); 

  const[loading, setLoading] = useState(false);

  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables:{
      userName: userNameInput.value,
      email: emailInput.value,
      firstName: firstNameInput.value,
      lastName: lastNameInput.value,
      password: passwordInput.value 
    }
  });

  const { value: emailValue } = emailInput;
  const { value: passwordValue} = passwordInput;
  const { value: firstNameValue} = firstNameInput;
  const { value: lastNameValue} = lastNameInput;
  const { value: userNameValue} = userNameInput;
    
  const handleSignUp = async() => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!emailRegex.test(emailValue)){
      return Alert.alert("That email is invalid")
    }
    if(firstNameValue === ""){
      return Alert.alert("I need your name");
    }
    if(userNameValue === ""){
      return Alert.alert("Invalid userName");
    }
    if(passwordValue === ""){ // password 확인 코드
        return Alert.alert("Invalid password");
    }else{
      try{
        setLoading(true);
        const {data: {createAccount}} = await createAccountMutation();
        if(createAccount){
          Alert.alert("Account Created", "Login Now!");
          navigation.navigate("Login", {emailValue});
        }
      }catch(e){
        console.log(e);
        Alert.alert("This email/userName is already taken");
        navigation.navigate("SignUp");
      }finally{
        setLoading(false);
      }
    }
  };
  const fbLogin = async() => {
    try {
      const {
        type,
        token
      } = await Facebook.logInWithReadPermissionsAsync('1688391781298306', {
        permissions: ['public_profile', "email"],
      });
      if (type === 'success') {
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id, last_name, first_name, email`);
        const data = await response.json();
        console.log(data);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  return(
    <>
      <TouchableWithoutFeedback 
        onPress={Keyboard.dismiss}
      >
        <View>
          <AuthInput 
            {...emailInput} 
            placeholder="Email" 
            keyboardType="email-address" 
            returnKeyType="send"
          />
          <AuthInput 
            {...passwordInput} 
            placeholder="password" 
            type="password" 
            secureTextEntry={true} 
            returnKeyType="send" 
            autoCorrect={false}
          />
          <AuthInput 
            {...firstNameInput} 
            placeholder="First Name" 
            autoCapitalize="words" 
          />
          <AuthInput 
            {...lastNameInput} 
            placeholder="Last Name" 
            autoCapitalize="words" 
          />
          <AuthInput 
            {...userNameInput} 
            placeholder="userName" 
          />
          <AuthButton 
            loading={loading}
            onPress={handleSignUp} 
            text="Sign Up" 
          />
          <FBContainer>
            <AuthButton bgColor={"#3b5998"} loading={false} onPress={fbLogin} text="Login with facebook" />
          </FBContainer>
        </View>
     </TouchableWithoutFeedback>
    </>
  );
};