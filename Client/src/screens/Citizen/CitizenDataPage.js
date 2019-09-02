import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Alert,
    Picker
} from "react-native";
import { Button } from "react-native-elements";
import { logOut, getUser, registerBuilding, getAllBuilding, getNowBuilding } from '../../components/UserAction';


export class CitizenDataPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            buildings: undefined,
            building_name: "",
            floor_name: "",
            building_list: undefined,
            floor_list: undefined
        }
    }
    
    componentDidMount = async() => {
        try {
            await this.updateBuldings();
            const userdata = await getUser();
            await this.setState({ username: userdata.username });
            const userNowBuilding = await getNowBuilding();
            if(userNowBuilding) {
                await this.setState({building_name: userNowBuilding.building_name});
                await this.updateFloors();
                await this.setState({floor_name: userNowBuilding.floor_name.replace(`${userNowBuilding.building_name}_`, "")});
            }
        } catch(error) {
            Alert.alert("ERROR", error);
        }
    }

    updateBuldings = async() => {
        try{
            const buildings = await getAllBuilding();
            console.log(buildings);
            this.setState({ buildings: buildings });
            let building_list = await buildings.map((s, i) =>{
                return <Picker.Item key={i} value={s.building_name} label={s.building_name} />
            });
            this.setState({ building_list: building_list });
        } catch(error) {
            Alert.alert("ERROR", error);
        }
    }

    updateFloors = async() => {
        try{
            if(this.state.building_name !== "") {
                const floors = await this.state.buildings.find((e) => {
                    return e.building_name === this.state.building_name;
                }).floors;
                let floor_list = await floors.map((s, i) =>{
                    const floor_name = s.floor_name.replace(`${this.state.building_name}_`, "");
                    return <Picker.Item key={i} value={floor_name} label={floor_name} />
                });
                this.setState({ floor_list: floor_list });
            }
        } catch(error) {
            Alert.alert("ERROR", error);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.userdata}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: "3%" }}>使用者: {this.state.username}</Text>
                    <View style={styles.pickerRowContainer}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>目前大樓：</Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={this.state.building_name}
                                onValueChange={async(itemValue) => {
                                    await this.setState({building_name: itemValue});
                                    await this.updateFloors();
                                }}>
                                {(this.state.building_list) ? 
                                    [<Picker.Item value='' label='請選擇大樓' />, this.state.building_list] : 
                                    <Picker.Item value='' label='請選擇大樓' />
                                }
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.pickerRowContainer}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>目前樓層：</Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                enabled={this.state.building_name !== '' ? true : false}
                                selectedValue={this.state.floor_name}
                                onValueChange={(itemValue) =>
                                    this.setState({floor_name: itemValue})
                                }>
                                {(this.state.floor_list) ? 
                                    [<Picker.Item value='' label='請選擇樓層' />, this.state.floor_list] : 
                                    <Picker.Item value='' label='請選擇樓層' />}
                            </Picker>
                        </View>
                    </View>
                </View>
                <Button 
                    onPress={() => {
                        registerBuilding(this.state.building_name, `${this.state.building_name}_${this.state.floor_name}`);
                    }}
                    title="更新目前位置"
                    containerStyle={{ width: "50%" }}
                    buttonStyle={{ backgroundColor: "#5BC100" }}
                    titleStyle={{ fontWeight: "bold" }}/>
                <Button
                    title="登出"
                    onPress={()=>logOut()}
                    containerStyle={{ width: "50%" }}
					buttonStyle={{ backgroundColor: "#DDDDDD", }}
                    titleStyle={{ color: "#5BC100", fontWeight: "bold" }}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    userdata: {
        height: "50%",
        width: "80%",
        alignItems: 'flex-start',
        borderColor: "black",
        borderWidth: 1,
        padding: "5%"
    },
    pickerRowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: "100%",
        marginVertical: "3%"
    },
    pickerContainer: {
        width: "50%",  
        borderColor: "black",
        borderWidth: 1,
    },
});