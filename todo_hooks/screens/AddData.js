import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Keyboard,
  TextInput
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from "react-native-vector-icons/MaterialIcons";
const useMountEffect = (fun) => useEffect(fun, [])
function AddData({ route, navigation }) {
  const [todos, setTodos] = useState([])
  const [value, setValue] = useState('')
  const [toggle, setToggle] = useState('true');
  const [itemId, setItemId] = useState(null);
 /**
  * call first time when screen render
  */
  useMountEffect(() => {

    datarenderfunction()
  })

  datarenderfunction = async () => {
    const storedData = await AsyncStorage.getItem('addtask');
    const storedDataParsed = JSON.parse(storedData);
    const changeid = route.params.chnageitemid
    if (changeid != '') {
      setToggle(false);
      const changedata = storedDataParsed.map((item, index) => {
        if (changeid == storedDataParsed[index].key) {
          setValue(item.text);
        }
        return item;
      })
      setTodos(changedata);
      setItemId(changeid);
      await AsyncStorage.setItem('addtask', JSON.stringify(changedata));
    }
  }
  /**
   * sava data on click add 
   */
  const Add = async () => {

    if (value.length > 0) {
      let tasks = {
        text: value,
        key: Math.random() * 10,
        checked: false
      }
      const arrData = [tasks];
      const storedData = await AsyncStorage.getItem('addtask');
      const storedDataParsed = JSON.parse(storedData);

      setTodos(storedDataParsed);
      let newData = [];
      if (storedDataParsed === null) {
        await AsyncStorage.setItem('addtask', JSON.stringify(arrData));
        const item = await AsyncStorage.getItem('addtask');
        const storedtodo = JSON.parse(item);
        setTodos(storedtodo);
      } else {
        newData = [...storedDataParsed, tasks];
        await AsyncStorage.setItem('addtask', JSON.stringify(newData));
        const item = await AsyncStorage.getItem('addtask');
        const storedtodo = JSON.parse(item);
        setTodos(storedtodo);
      }
      setValue('');
      navigation.navigate('Home')
    }
  }

  /**
   * Update data
   */
  const Update = async () => {
    setToggle(true);
    todos.map(async (item, index) => {
      if (itemId == todos[index].key) {
        todos[index].text = value;
        await AsyncStorage.setItem('addtask', JSON.stringify(todos));
      }
    })
    Keyboard.dismiss();
    setValue('');
    navigation.navigate('Home')
  }


  return (
    <View style={styles.container}>

      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          multiline={true}
          onChangeText={(value) => setValue(value)}
          placeholder={'Write something !!!'}
          placeholderTextColor='#808080'
          value={value}
        />

      </View>
      <View style={styles.myButton}>
        <Icon
          name={toggle ? 'done' : 'done'}
          size={30}
          color="#fff"
          onPress={toggle ? Add : Update}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  textInput: {
    height: 60,
    flex: 1,
    // minHeight: '35%',
    height: 'auto',
    marginTop: '5%',
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    paddingLeft: 10,
    // borderColor:'white',
    // borderWidth: 1
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
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    paddingRight: 10,
    paddingBottom: 5
  },
  myButton: {
    height: 60,
    width: 60,  //The Width must be the same as the height
    borderRadius: 400, //Then Make the Border Radius twice the size of width or Height   
    backgroundColor: 'purple',
    justifyContent: 'center',
    alignItems: 'center',
    right: 20,
    bottom: 20,
    position: 'absolute'

  }
});


export default AddData
