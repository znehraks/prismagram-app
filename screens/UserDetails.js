import React from "react";
import { useQuery } from "react-apollo-hooks";
import {gql} from 'apollo-boost';
import { USER_FRAGMENT } from "../fragments";
import Loader from "../components/Loader";
import { ScrollView } from "react-native-gesture-handler";
import UserProfile from "../components/UserProfile";

const GET_USER = gql`
    query seeUser($userName: String!){
        seeUser(userName: $userName){
            ...UserParts
        }
    }
    ${USER_FRAGMENT}
`;

export default ({ navigation }) => {
    const { loading, data } = useQuery(GET_USER, {
        variables: {
            userName: navigation.getParam("userName")
        }
    });
    console.log(loading, data);
    return(
    <ScrollView>
        {loading ? 
        <Loader /> : 
        data && data.seeUser && <UserProfile {...data.seeUser}
        />
        }
    </ScrollView>
    );
};