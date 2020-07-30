import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import Icon from "react-native-vector-icons/MaterialIcons";
import Task from './Task'
import AsyncStorage from '@react-native-community/async-storage';
function Home({ navigation }) {
    const [todos, setTodos] = useState([])
    const useMountEffect = (fun) => useEffect(fun, [])
   /**
    * for on Back reload this screen
    */
    useFocusEffect(() => {
        callfunction()
    })
    callfunction = async () => {
        const storedData = await AsyncStorage.getItem('addtask');
        const storedDataParsed = JSON.parse(storedData);
        setTodos(storedDataParsed);
        return null;
    }
  /**
   * call first time when screen render
   */
    useMountEffect(() => {
        datarenderfunction()
    })
    datarenderfunction = async () => {
        console.log("call first time")
        const storedData = await AsyncStorage.getItem('addtask');
        const storedDataParsed = JSON.parse(storedData);
        setTodos(storedDataParsed);
        console.log("storedDataParsed=====", storedDataParsed);
    }

    /**
     * @param {String} id wise delete tasks 
     */
    const Delete = async (id) => {
        console.log("call delete")
        const removedata = todos.filter((todo => {
            if (todo.key !== id) return true
        }))
        setTodos(removedata);
        await AsyncStorage.setItem('addtask', JSON.stringify(removedata));

    }
    /**
     * @param {String} id wise data edit and navigate to the add data screen
     */
    const EditData = async (id) => {
        navigation.navigate('AddData', { chnageitemid: id });
    }
   
    return (
        <View style={styles.container}>
            <ScrollView style={{ width: '100%' }}>
                <>
                    {todos !== null ? todos.map((task) => (
                        <TouchableOpacity onPress={() => EditData(task.key)}>
                            <Task
                                text={task.text}
                                key={task.key}
                                checked={task.checked} // toggle the checked icon
                                delete={() => Delete(task.key)}
                            />
                        </TouchableOpacity>
                    )) : null
                    }
                </>
            </ScrollView>
            <View style={styles.myButton}>
                <Icon
                    name="add"
                    size={30}
                    color="#fff"
                    onPress={() => {
                        navigation.navigate('AddData');
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
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


export default Home
