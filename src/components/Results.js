'use strict';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { render } from 'react-dom';
function Results(props){
    let path = props.path;
    let lines = props.lines;
    let duration = props.duration;

    console.log(lines[0][0]);
    return(
        <View style={styles.textWrapper}>
            <Text>Käytä seuraavaa reittiä:</Text>
            <Text>{path}</Text>
            <Text>Linjastoilla:</Text>
            {lines[0].map((item,key)=>(
                <Text key={key}>{item}</Text>
            ))}
            <Text>Matkan kesto on:</Text>
            <Text>{duration}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    textWrapper: {
        fontSize:20,
    },
});
export default Results;