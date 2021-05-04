import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    TextInput,
} from 'react-native';

function CapnhatTaisan()  {
    return (
        <View style={styles.MainContainer}>
    
               <TextInput
                     
                 placeholder="Enter First Name"
             
                 style={styles.TextInputStyle}
    
                 returnKeyType = {"next"}
                 
                 autoFocus = {true}
    
                 onSubmitEditing={(event) => { 
                   this.refs.LastName.focus(); 
                 }}
    
               />
    
               <TextInput
    
                 ref='LastName'
                     
                 placeholder="Enter Last Name"
    
                 returnKeyType = {"next"}
             
                 style={styles.TextInputStyle}
    
                 onSubmitEditing={(event) => { 
                   this.refs.Address.focus(); 
                 }}
               />
    
               <TextInput
    
                 ref='Address'
                     
                 placeholder="Enter Address"
             
                 style={styles.TextInputStyle}
               />
    
              
        </View>
      );
    }
   
    
   const styles = StyleSheet.create({
    
    MainContainer: {
      flex: 1,
      margin: 10
      
    },
    
    TextInputStyle:{
     
        textAlign: 'center',
        marginBottom: 10,
        height: 50,
        width: '93%',
      },
    
   });

export default CapnhatTaisan;