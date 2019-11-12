import React, {useState} from "react";
import {TouchableWithoutFeedback, Keyboard} from 'react-native';
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import {Alert} from 'react-native';
import { LOG_IN } from "./AuthQueries";
import { useMutation } from "react-apollo-hooks";
import { useLogIn } from "../../AuthContext";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;


export default ({navigation}) => {
  const emailInput = useInput("");
  const logIn = useLogIn();
  const[loading, setLoading] = useState(false);
  const passwordInput = useInput("");
  const { value: passwordValue} = passwordInput;
    const { value: emailValue } = emailInput;
    const [loginMutation] = useMutation(LOG_IN, {
      variables: {
        email: emailInput.value, 
        password: passwordInput.value}
    });
  const handleLogin = async() => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(emailValue === ""){
      return Alert.alert("Email can't be empty!");
    }else if(!emailValue.includes("@") || !emailValue.includes(".")){
      return Alert.alert("Please write an email!");
    }else if(!emailRegex.test(emailValue)){
      return Alert.alert("That email is invalid")
    }
    else{
      if(passwordValue === "" || passwordValue === undefined){ // password 확인 코드
        return Alert.alert("Password is incorrect");
      }else{
        try{
          setLoading(true);
          const {data: {login: token}} = await loginMutation();
          if(token === ""){
            Alert.alert("Wrong password");
            return;
          }else if(token !== "" && token !== undefined){
              Alert.alert("Login Success");
              logIn(token);
              return;
          }
        }catch(e){
          console.log(e);
          Alert.alert("You need to Sign Up")
          navigation.navigate("SignUp", {emailValue});
        }finally{
          setLoading(false);
        }
    }}
  };
  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput {...emailInput} placeholder="Email" keyboardType="email-address" returnKeyType="send"/>
        <AuthInput {...passwordInput} placeholder="password" type="password" secureTextEntry={true} returnKeyType="send" onSubmitEditing={handleLogin} autoCorrect={false}/>
        <AuthButton loading={loading} onPress={handleLogin} text="Log in" />
      </View>
    </TouchableWithoutFeedback>
  );
};