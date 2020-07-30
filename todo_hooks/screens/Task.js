import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from "react-native-vector-icons/MaterialIcons";

const Task = (props) => {
    return (
        <View style={styles.taskWrapper}>
            <View >
                {props.checked && <View style={styles.verticalLine}></View>}
                <Text style={styles.task}>{props.text}</Text>
            </View>
            <Icon
                name="delete"
                size={30}
                color="#000"
                style={{ marginLeft: 'auto' }}
                onPress={props.delete}
            />
        </View>
    )
}
export default Task

const styles = StyleSheet.create({
    taskWrapper: {
        marginTop: '5%',
        flexDirection: 'row',
        borderColor: '#808080',
        width: '100%',
        alignItems: 'stretch',
        padding: 10,
        minHeight: 40,
        elevation: 3,

    },
    task: {
        marginTop: 6,
        fontSize: 17,
        fontWeight: 'bold',
        color: 'black',
    },
    verticalLine: {
        borderBottomColor: 'black',
        borderBottomWidth: 4,
        marginLeft: 10,
        width: '100%',
        position: 'absolute',
        marginTop: 15
    }
})