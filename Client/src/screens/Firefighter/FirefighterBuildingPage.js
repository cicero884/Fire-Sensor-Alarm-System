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
import { getAllBuilding } from '../../components/UserAction';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export class FirefighterBuildingPage extends Component {
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
            people_count: 0
        };
    }

    componentWillMount = async() => {
        try{
            await this.updateBuldings();
            await this.updatePlanAndNodeAndPeople();
            this.focusOnListener = await this.props.navigation.addListener('willFocus', () => this.focusOnPage());
            await this.focusOnPage();
        } catch(error) {
            Alert.alert("ERROR", error);
        }
    }

    componentWillUnmount  = async() => {
		await this.focusOnListener.remove();
    }

    focusOnPage = async() => {
        console.log('focus on');
        const { navigation } = this.props;
        const building_name = navigation.getParam('building_name', "");
        const floor_name = navigation.getParam('floor_name', "");
        await this.setState({building_name: building_name});
        await this.updateFloors();
        await this.setState({floor_name: floor_name});
        await this.updatePlanAndNodeAndPeople();
        navigation.state.params = null;
        
    }  

    updateBuldings = async() => {
        try{
            const buildings = await getAllBuilding();
            console.log(buildings);
            this.setState({ buildings: buildings });
            /* For stupid DEF */
            let building_list_cond = await buildings.filter((s, i) =>{
                if(s.building_name !== "DEF")
                    return true;
                else 
                    return false;
            });
            let building_list = await building_list_cond.map((s, i) =>{
                return <Picker.Item key={i} value={s.building_name} label={s.building_name} />
            });
            console.log(building_list);
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

    updatePlanAndNodeAndPeople = async() => {
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
                                await this.setState({ 
                                    floor_plan: `http://140.116.104.202:8000/media/${e.floor_plan}` ,
                                    people_count: e.people_count
                                });
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
                                this.updatePlanAndNodeAndPeople();
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
                                await this.updatePlanAndNodeAndPeople(); 
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
                {(this.state.floor_plan && this.state.node_list) ? 
                    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>預估樓層人數: {this.state.people_count}人</Text> : 
                    null
                }
                <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: windowHeight*0.03 }}>節點資料</Text>
                {(this.state.node_list) ? 
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