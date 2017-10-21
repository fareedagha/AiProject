/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
const FilePickerManager = require('NativeModules').FilePickerManager;
import RNFB from 'react-native-fetch-blob' ;
import base64 from 'base-64' ;

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  constructor(props){
    super(props)
    this.state= {
      file :''
    }
    this.onVoice = this.onVoice.bind(this);
    this.change = this.change.bind(this);
  }

  onVoice(){
    FilePickerManager.showFilePicker(null, (response) => {
  console.log('Response = ', response);
 
  if (response.didCancel) {
    console.log('User cancelled file picker');
  }
  else if (response.error) {
    console.log('FilePickerManager Error: ', response.error);
  }
  else {
    this.setState({
      file: response
    });
  }
  RNFB.fs.readFile(this.state.file.uri , 'base64').then((res) => {
        console.log("base 64 content",res)
    }).catch((err)=> console.log(err))
});

  }
change(){
  console('nmcdskln')
    
}

  render() {
    return (
       <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='' />
            </Button>
          </Left>
          <Body>
            <Title style={{alignSelf:'center'}}>Hello Voice </Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='' />
            </Button>
          </Right>
        </Header>
        <Button iconLeft 
        onPress={this.onVoice}
        style={styles.button}
        >
            <Text style={{marginLeft:5}}>Brows Voice</Text>
            <Icon style={{marginRight:5}} name='microphone' />
          
          </Button>
           <Button iconLeft style={{marginTop:20, alignSelf:'center',width:200}}>
       
       
            <Text style={{marginLeft:5}}>Anaylise</Text>
            <Icon style={{marginRight:5}} name='pulse' />
          
          </Button>
      </Container>
     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ADB3A9',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button:{
    marginTop:200,
    alignSelf:'center',
    width:200

  }
});
