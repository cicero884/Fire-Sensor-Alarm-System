import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    ScrollView,
    Picker,
} from "react-native";
import { Button } from 'react-native-elements';
import { getAllBuilding } from '../../components/UserAction';
import Svg, { Image, Circle } from 'react-native-svg';

export class CitizenBuildingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buliding_name: '',
            floor_name: ''
        };
    }

    componentWillMount = async() => {
        const buildings = await getAllBuilding();
        console.log(buildings);
    }
    
    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.selectContainer}>
                    <View style={styles.pickerRowContainer}>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={this.state.buliding_name}
                                itemStyle={{backgroundColor:"yellow"}}
                                onValueChange={(itemValue) =>
                                    this.setState({buliding_name: itemValue})
                                }>
                                <Picker.Item value='' label='請選擇大樓' /> 
                                <Picker.Item label="Java" value="java" />
                                <Picker.Item label="JavaScript" value="js" />
                            </Picker>
                        </View>
                        <Button 
                            title="確認"
                            disabled={
                                (this.state.buliding_name !== "" && 
                                this.state.floor_name !== "") ? false : true
                            }
                            containerStyle={{ width: "30%" }}
							buttonStyle={{ backgroundColor: "#5BC100" }}
                        	titleStyle={{ fontWeight: "bold" }}/>
                    </View>
                    <View style={styles.pickerRowContainer}>
                        <View style={styles.pickerContainer}>
                            <Picker
                                enabled={this.state.buliding_name !== '' ? true : false}
                                selectedValue={this.state.floor_name}
                                itemStyle={{backgroundColor:"yellow"}}
                                onValueChange={(itemValue) =>
                                    this.setState({floor_name: itemValue})
                                }>
                                <Picker.Item value='' label='請選擇樓層' /> 
                                <Picker.Item label="Java" value="java" />
                                <Picker.Item label="JavaScript" value="js" />
                            </Picker>
                        </View>
                        <Button 
                            title="更新資料"
                            containerStyle={{ width: "30%" }}
							buttonStyle={{ backgroundColor: "#DDDDDD", }}
                        	titleStyle={{ color: "#5BC100", fontWeight: "bold" }}/>
                    </View>
                </View>
                <View style={{ width: '90%', height: "auto"}}>
                <Svg
                    height="100%"
                    width="100%"
                    viewBox='0 0 100 100'
                    preserveAspectRatio='meet'
                >
                    <Image
                        width="100%"
                        height="100%"
                        href={{uri: "https://i.imgur.com/f6CcrIo.jpg"}}/>
                </Svg>  
                </View>      
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '100%',
    },
    selectContainer: {
        flexDirection: "column",
        justifyContent: 'space-around',
        width: "80%",
        marginVertical: '3%',
    },
    pickerRowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    pickerContainer: {
        width: "65%",
        borderColor: "black",
        borderWidth: 1,
    },
    planContainer: {
        width: "90%"
    }
});