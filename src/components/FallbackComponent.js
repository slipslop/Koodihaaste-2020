'use strict';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
function FallbackComponent(){
    return(
        <View>
            <Text>You failed</Text>
        </View>
    )
}

export default FallbackComponent;