import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    ScrollView,
    Picker,
    Image,
    Dimensions,
    Alert
} from "react-native";
import { Button, ListItem } from 'react-native-elements';
import { getAllBuilding, getNowBuilding } from '../../components/UserAction';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export class CitizenBuildingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            building_name: '',
            building_list: undefined,
            floor_name: '',
            floor_list: undefined,
            floor_plan: undefined,
            floor_plan_width: 0,
            floor_plan_height: 0,
            buildings: undefined,
            node_list: undefined,
        };
    }

    componentWillMount = async() => {
        try{
            await this.updateBuldings();
            await this.updatePlanAndNode();
            const userNowBuilding = await getNowBuilding();
            if(userNowBuilding) {
                await this.setState({building_name: userNowBuilding.building_name});
                await this.updateFloors();
                await this.setState({floor_name: userNowBuilding.floor_name.replace(`${userNowBuilding.building_name}_`, "")});
                await this.updatePlanAndNode();
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

    updatePlanAndNode = async() => {
        try{
            await this.setState({ 
                floor_plan: undefined,
                node_list: undefined 
            });
            let nodes = undefined;
            if(this.state.building_name != "" && this.state.floor_name != "") {
                await this.state.buildings.forEach(async(e) => {
                    if(e.building_name === this.state.building_name) {
                        await e.floors.forEach(async(e) => {
                            if(e.floor_name === `${this.state.building_name}_${this.state.floor_name}`) {
                                await this.setState({ floor_plan: `http://140.116.104.202:8000/media/${e.floor_plan}` });
                                nodes = e.nodes;
                            }
                        })
                    }
                });
            }
        
            if(this.state.floor_plan) {
                Image.getSize(this.state.floor_plan, (width, height) => {
                    console.log(`${width} ${height}`);
                    console.log(`${windowWidth} ${windowHeight}`);
                    this.setState({
                        floor_plan_width: windowWidth * 0.9,
                        floor_plan_height: height * (windowWidth / width)  * 0.9
                    });
                });
            }
            if(nodes && nodes.length > 0) {
                let node_list = nodes.map((s, i) =>{
                    return <ListItem
                                key={i}
                                rightIcon={
                                    s.node_alive ? 
                                        <View style={[styles.circle, {backgroundColor:"green"}]} /> : 
                                        <View style={[styles.circle, {backgroundColor:"red"}]} />
                                }
                                containerStyle={{ borderColor: "black", borderWidth: 1}}
                                title={s.node_name}
                                subtitle={`氣體濃度： ${s.node_gas_density} / 溫度： ${s.node_temperature}°C`}
                            />
                });
                this.setState({ node_list: node_list });
            }
        } catch(error) {
            Alert.alert("ERROR", error);
        }
    }
    
    render() {      
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.selectContainer}>
                    <View style={styles.pickerRowContainer}>
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
                        <Button 
                            onPress={() => {
                                this.updatePlanAndNode();
                            }}
                            title="確認"
                            disabled={
                                (this.state.building_name !== "" && 
                                this.state.floor_name !== "") ? false : true
                            }
                            containerStyle={{ width: "30%" }}
							buttonStyle={{ backgroundColor: "#5BC100" }}
                        	titleStyle={{ fontWeight: "bold" }}/>
                    </View>
                    <View style={styles.pickerRowContainer}>
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
                        <Button 
                            onPress={async() => {
                                await this.updateBuldings();
                                await this.updatePlanAndNode(); 
                            }}
                            title="更新資料"
                            containerStyle={{ width: "30%" }}
							buttonStyle={{ backgroundColor: "#DDDDDD", }}
                        	titleStyle={{ color: "#5BC100", fontWeight: "bold" }}/>
                    </View>
                </View>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>平面圖</Text>
                {(this.state.floor_plan) ? 
                    <Image
                        resizeMode="contain"
                        source={{ uri: this.state.floor_plan }}
                        style={{ width: this.state.floor_plan_width, height: this.state.floor_plan_height, marginBottom: windowHeight*0.05 }}/> : 
                    <Text style={{ fontSize: 20 }}>沒有平面圖</Text>
                }
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>節點資料</Text>
                {(this.state.node_list ) ? 
                    <View style={{ width: "90%" }}>{this.state.node_list}</View> : 
                    <Text style={{ fontSize: 20 }}>沒有節點資料</Text>
                }
            </ScrollView>
        );
    }
}

/* Everything relate to height or vertical must use absolute  */
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        width: '100%',
    },
    selectContainer: {
        flexDirection: "column",
        justifyContent: 'space-around',
        width: "80%",
        height: windowHeight*0.22,
        marginVertical: windowHeight*0.03,
    },
    pickerRowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: "100%",
        height: windowHeight*0.4,
    },
    pickerContainer: {
        width: "65%",  
        borderColor: "black",
        borderWidth: 1,
    },
    planContainer: {
        width: "90%"
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 30/2,
        backgroundColor: 'red'
    }
});