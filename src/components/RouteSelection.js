'use strict';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import data from '../../assets/reittiopas.json';
import findPath from './Algorithm.js';
import Results from './Results.js';
var json = data;

function RouteSelection(){
    const [ from, setFrom ] = useState("");
    const [ to, setTo ]     = useState("");
    const [ showResult, setShowResults ] = useState(false);
    const [ path, setPath ] = useState([]);
    const [ lines, setLines ] = useState([]);
    const [ duration, setDuration ] = useState("0");

    
    function setFromStop(e,stop){
      setFrom(stop);
    }

    function setToStop(stop){
      setTo(stop)
    }

    function calculateRoute(){
      if(from && to) {
        //console.log("ok, i got all " + from + " " + to);
        let res = findPath(from,to);
        setStates(res);
        
      }
    }
    function setStates(res){
      console.log(from);
      clearPathAndLines();
      setPath([...path,res.path]);
      setLines([...lines,res.lines]);
      setDuration(res.duration);
      setShowResults(true);
      console.log(path);
    }
    function clearPathAndLines(){
      setPath(path.splice(0,path.length));
      setLines(lines.splice(0,lines.length));
    }
    return (
      <>
        <View style={styles.wrapper}>
          <View style={styles.routeSelectionWrapper}>
            <Text style={styles.routeSelectionText}>Mistä pysäkiltä haluaisit matkustaa?</Text>
            <View style={styles.routeSelection}>
              {json.pysakit.map((stop,b) => {
                  return (
                  <TouchableOpacity key={b} style={styles.selectStopButton} onPress={(e) => setFromStop(e,stop)}>
                    <Text style={styles.calculateRouteButtonText}>{stop}</Text>
                  </TouchableOpacity>
                  );
              })}
              </View>
          </View>
          <View style={styles.routeSelectionWrapper}>
            <Text style={styles.routeSelectionText}>Minne haluaisit matkustaa?</Text>
            <View style={styles.routeSelection}>
              {json.pysakit.map((stop,b) => {
                  return (
                  <TouchableOpacity key={b} style={styles.selectStopButton} onPress={() => setToStop(stop)}>
                    <Text style={styles.calculateRouteButtonText}>{stop}</Text>
                  </TouchableOpacity>
                  );
              })}
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.calculateRouteButton} onPress={calculateRoute}>
          <Text style={styles.calculateRouteButtonText}>Laske reitti</Text>
        </TouchableOpacity>
          { showResult ? <Results path={path} lines={lines} duration={duration} /> : null }

      </>
      
    );
  }


const styles = StyleSheet.create({
  container: {

  },
  routeSelectionWrapper:{
    // textAlign:'center',
    fontFamily:'Montserrat-Light',
    margin:10,
    padding:10,
  },
  selectStopButton: {
    backgroundColor: "#1C364A",
    padding:15,
    margin:5,
    borderRadius:5,
    minWidth:20,
    maxWidth:40,
  },
  routeSelection:{
    flexDirection:'row',
    flexWrap:'wrap',
  },
  routeSelectionText:{
    fontSize:20,
    color:'#242020',
    padding:20,
  },
  calculateRouteButton:{
    backgroundColor:'#73ACCF',
    margin:20,
    padding:15,
  },
  calculateRouteButtonText:{
    color:'white',
    fontWeight:'600',
    letterSpacing:1.6,
  },

});



export default RouteSelection;