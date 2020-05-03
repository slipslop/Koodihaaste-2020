'use strict';
import data from '../../assets/reittiopas.json';

function Graph(){
    this.nodes = [];
    this.adjacencyList = {};
}

Graph.prototype.addNode = function(node){
    this.nodes.push(node);
    this.adjacencyList[node] = [];
}

Graph.prototype.addEdge = function(node1,node2,weight){
    this.adjacencyList[node1].push({node:node2,weight:weight});
    this.adjacencyList[node2].push({node:node1,weight:weight});
}

Graph.prototype.init = function(){
    data.pysakit.forEach(el => {
        this.addNode(el); 
    });
    data.tiet.forEach(el => {
        this.addEdge(el.mista,el.mihin,el.kesto);
    });

}

function PriorityQueue(){
    this.collection = [];
}

PriorityQueue.prototype.addElement = function(arr){

    //let nodeValue = arr[0];
    let nodeWeight = arr[1];
    if(this.isEmpty()){
        this.collection.push(arr);
    }else {

        let added = false;
        for(let i = 1; i <= this.collection.length; i++) {
            if(nodeWeight < this.collection[i-1][1]) {
                this.collection.splice(i-1,0,arr);
                added = true;
                break;
            }
        }
        if(!added){
            this.collection.push(arr);
        }
    }
}

PriorityQueue.prototype.removeElement = function() {
    //shift() method removes the first element from an array and returns that removed element. This method changes the length of the array.
    return this.collection.shift();
}

PriorityQueue.prototype.isEmpty = function(){
    return (this.collection.length === 0);
}
var graph = new Graph();
graph.init();



function findPath(startNode, endNode){
    console.log("sain " + startNode + " " + endNode);
    let times = {};
    let backtrace = {};
    let pq = new PriorityQueue();
    times[startNode] = 0;
    graph.nodes.forEach(function(node) {
        if( node !== startNode){
            times[node] = Infinity;
        }
    });
    console.log(times);
    //add starting node
    pq.addElement([startNode,0]);
    while(!pq.isEmpty()){
        let shortestStep = pq.removeElement();
        let currentNode = shortestStep[0];
        graph.adjacencyList[currentNode].forEach(function(neighbor){
            //console.log(neighbor);
            let time = times[currentNode] + neighbor.weight;
            if(time < times[neighbor.node]) {
                times[neighbor.node] = time;
                backtrace[neighbor.node] = currentNode;
                pq.addElement([neighbor.node, time]);
            }
        });
        
    }
    let path = [endNode];
    let lastStep = endNode;  
    //console.log("backtrace is ");
    //console.log(times);
    while(lastStep !== startNode) {
        path.unshift(backtrace[lastStep])
        lastStep = backtrace[lastStep]
        //console.log(path);
    }

    let lines = returnLinjasto(path);
    console.log(lines);
    let answer = {
        'path' : path,
        'duration' : times[endNode],
        'lines' : lines,
    };
    //answer['path'] = `Reitti on ${path} ja siihen kuluva aika on: ${times[endNode]}`
    
    return answer;
}


function returnLinjasto(path){
    var linjasto = [];
    for(let i = 0; i <= path.length;i+=2) {
        let searchString = [path[i] , path[i+1]];
        let newLinjasto = getLinjasto(searchString);
        if(!linjasto.includes(newLinjasto)){
            linjasto.push(newLinjasto);
        }
        //linjasto.push(getLinjasto(searchString));
    }
    return linjasto;
    
}

function getLinjasto(stops){
    var lines = "";
    //console.log("sain " + stops);
    Object.keys(data.linjastot).map(function(key,index) {
        //ota linjaston kaikki pysäkit
        // tsekkaa onko siinä kyseisessä linjastossa kaikki stops pysäkit
        //jos niin return true muuten koita toista linjastoa.
       
        if(data.linjastot[key].includes(stops[0]) && data.linjastot[key].includes(stops[1])){
            lines = key;
        }
        if(!stops[1]){
            if(data.linjastot[key].includes(stops[0])){
                lines = key;
            }
        }

    });
    return lines;
    
}
export default findPath;

//console.log(findPath(start,end));
