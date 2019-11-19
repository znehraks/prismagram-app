import React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native-gesture-handler';
import constants from '../constants';
import styles from '../styles'

const SearchBar = ({onChange, value, onSubmit}) => (
    <TextInput
        style={{
            width: constants.width - 40, 
            height: 35, 
            backgroundColor: styles.lightGreyColor, 
            padding: 10, 
            borderRadius: 5,
            textAlign: "center"
        }}
        returnKeyType="search"
        onChangeText={onChange}
        onEndEditing={onSubmit}
        value={value}
        placeholder={"Search"}
        placeholderTextColor={styles.darkGreyColor}
    />
);

SearchBar.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default SearchBar;
