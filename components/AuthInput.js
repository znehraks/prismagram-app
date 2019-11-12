import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import constants from '../constants';

const Container = styled.View`
    margin-bottom: 10px;
`;
const TextInput = styled.TextInput`
    width: ${constants.width / 1.7};
    padding: 10px;
    background-color: ${props => props.theme.greyColor};
    border: 1px solid ${props => props.theme.lightGreyColor};
    border-radius: 4px;
`;

const AuthInput = ({
    placeholder, 
    value, 
    keyboardType="default", 
    autoCapitalize="none",
    onChange,
    returnKeyType="done",
    onSubmitEditing = () => null,
    autoCorrect = true,
    secureTextEntry
}) => (
    <Container>
        <TextInput 
        keyboardType={keyboardType}
        returnKeyType={returnKeyType} 
        placeholder={placeholder} 
        value={value} 
        autoCapitalize={autoCapitalize}
        onChangeText={onChange}
        onSubmitEditing={onSubmitEditing}
        autoCorrect={autoCorrect}
        secureTextEntry={secureTextEntry}
        />
    </Container>
);

AuthInput.propTypes = {
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    keyboardType: PropTypes.oneOf([
        "default", 
        "number-pad", 
        "decimal-pad", 
        "numeric", 
        "email-address", 
        "phone-pad"
    ]),
    autoCapitalize: PropTypes.oneOf([
        "none", 
        "sentences", 
        "words", 
        "characters"
    ]),
    onChange: PropTypes.func.isRequired,
    secureTextEntry: PropTypes.bool,
    returnKeyType: PropTypes.oneOf([
        "done",
        "go",
        "next",
        "search",
        "send"
    ]),
    onSubmitEditing: PropTypes.func,
    autoCorrect: PropTypes.bool
}

export default AuthInput;