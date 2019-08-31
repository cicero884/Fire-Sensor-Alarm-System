import React, { Component } from "react";
import { 
    View,
    Text,
	StyleSheet,
} from "react-native";
import { Input, Button } from 'react-native-elements';
import { RNCamera } from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';
import { Dimensions } from "react-native";
import { registerBuilding } from '../../components/UserAction';
import ExtraDimensions from 'react-native-extra-dimensions-android';

export class CitizenScanPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			renderCamera: null,
			buliding_name: "",
			floor_name: "1F",
			floor_name_error_msg: "",
			camera_ratio: "16:9",
			qrCodeWidthMax: 0,
			qrCodeWidthMin: 0,
			qrCodeHeightMax: 0,
			qrCodeHeightMin: 0,
		}
	}

	_onLayout = async (event) => {
		const screenScale = Dimensions.get('screen').scale;
		const screenWidth = ExtraDimensions.getRealWindowWidth() * screenScale;
		const screenHeight = ExtraDimensions.getRealWindowHeight() * screenScale;
		const viewWidth = event.nativeEvent.layout.width * screenScale;
		const viewHeight = event.nativeEvent.layout.height * screenScale;
		const qrCodeWidth = viewWidth * 0.6;
		const qrCodeHeight = viewHeight * 0.5 * 0.8;
		const qrCodeWidthMax = (screenWidth + qrCodeWidth) * 0.5;
		const qrCodeWidthMin = qrCodeWidthMax - qrCodeWidth;
		const qrCodeHeightMax = (screenHeight + qrCodeHeight) * 0.5;
		const qrCodeHeightMin = qrCodeHeightMax - qrCodeHeight;
		await this.setState({ 
			qrCodeWidthMax: qrCodeWidthMax,
			qrCodeWidthMin: qrCodeWidthMin,
			qrCodeHeightMax: qrCodeHeightMax,
			qrCodeHeightMin: qrCodeHeightMin
		});
	}

	componentWillMount = () => {
		this.focusOnListener = this.props.navigation.addListener('willFocus', () => this.addQRCodeScanner());
		this.focusOffListener = this.props.navigation.addListener('willBlur', () => this.removeQRCodeScanner());
	}
	
	componentWillUnmount  = () => {
		this.focusOnListener.remove();
		this.focusOffListener.remove();
	}

	/* For navigation didFocus, re-render camera */
	addQRCodeScanner = () => {
		console.log('addQRCodeScanner');
		this.setState({ 
			renderCamera: 
				<RNCamera
					ref={ref => {
						this.camera = ref;
					}}
					style={{
						flex: 1,
						overflow: 'hidden',
						width: '100%',
						height: '50%',
					}}
					onCameraReady={this.setRatio}
					onBarCodeRead={this.barcodeRecognized}
					ratio={this.state.camera_ratio}
				>
					<BarcodeMask 
						width="60%"
						height="80%"
						edgeColor="red"
						animatedLineColor="red"
						animatedLineHeight={1}
						lineAnimationDuration={1000}
						
					/>
				</RNCamera>
		});
	}

	/* For navigator didBlur, remove camera */
	removeQRCodeScanner = () => {
		console.log('removeQRCodeScanner');
		this.setState({ renderCamera: null })
	}

	setRatio = async() => {
		const ratioList = await this.camera.getSupportedRatiosAsync();
		this.setState({camera_ratio: ratioList[ratioList.length-1]});
	}

	barcodeRecognized = async (e) => {
		const marker_0 = e.bounds.origin[0];
		const marker_1 = e.bounds.origin[1];
		const marker_2 = e.bounds.origin[2];
		if((Number(marker_0.x) <= this.state.qrCodeHeightMax && Number(marker_0.y) <= this.state.qrCodeWidthMax) 
			&& (Number(marker_1.x) >= this.state.qrCodeHeightMin && Number(marker_1.y) <= this.state.qrCodeWidthMax) 
			&& (Number(marker_2.x) >= this.state.qrCodeHeightMin && Number(marker_2.y) >= this.state.qrCodeWidthMin)) {
				console.log(e.data);
				await this.camera.pausePreview();
				this.setState({buliding_name: e.data});
		}
	};

	resetScan = async() => {
		this.setState({ buliding_name: "", floor_name: "1F" });
		await this.camera.resumePreview();
	}

    render() {
        return (
			<View style={{ flex: 1,}} onLayout={this._onLayout} >
				<View style={{ flex: 1 }}>
					{this.state.renderCamera}
				</View>
				<View style={styles.bottomContainer}>
					<Text style={styles.bottomText}>輸入大樓名稱</Text>
					<Input
						placeholder={"掃描或手動輸入"}
						value={this.state.buliding_name}
						onChangeText={(buliding_name) => {
                            this.setState({buliding_name: buliding_name});
                        }}
						containerStyle={{ margin: 0, width: "80%" }}
						inputStyle={{ padding: 0 }}
						autoCapitalize='none'/>
					<Text style={[styles.bottomText, {marginTop: "1%"}]}>預計前往樓層</Text>
					<Input
						placeholder={"ex.1F, B1"}
						value={this.state.floor_name}
						onChangeText={(floor_name) => {
                            this.setState({floor_name: floor_name});
							if(!((/^[1-9][\d]*[F]$|^[B][1-9][\d]*$/).test(floor_name))) {
                                this.setState({floor_name_error_msg: "必須為_F或B_，並為合法樓層"});
							}
                            else {
                                this.setState({floor_name_error_msg: ""});
							}
                        }}
						autoCapitalize='characters'
						containerStyle={{ margin: 0, width: "80%" }}
						inputStyle={{ padding: 0 }}
						errorMessage={this.state.floor_name_error_msg}
                        errorStyle={{ fontSize: 12 }}/>
					<View style={styles.bottomButtonGroupContainer}> 
						<Button
							onPress={() => registerBuilding(this.state.buliding_name, this.state.buliding_name + "_" + this.state.floor_name)}
							title={"確認登錄"}
							titleStyle={{ fontSize: 18 }}
							containerStyle={{ width: "40%" }} 
							buttonStyle={{ backgroundColor: "#5BC100" }}
                        	titleStyle={{ fontWeight: "bold" }} 
							disabled={
								(this.state.floor_name_error_msg === "" && 
								this.state.floor_name !== "" &&
								this.state.buliding_name !== "") ? false : true
							}/>
						<Button
							onPress={() => this.resetScan()}
							title={"重設"}
							titleStyle={{ fontSize: 18 }}
							containerStyle={{ width: "40%" }}
							buttonStyle={{ backgroundColor: "#DDDDDD", }}
                        	titleStyle={{ color: "#5BC100", fontWeight: "bold" }} />
					</View>
				</View> 
			</View>
        );
    }
}


const styles = StyleSheet.create({
	bottomContainer: {
		flex: 1,
		width: "100%",
		alignItems: 'center',
	},
	bottomButtonGroupContainer: {
		flexDirection: "row",
		justifyContent: 'space-between',
		alignItems: 'center',
        width: "80%",
        marginTop: "4%",
        padding: 0,
	},
	bottomText: {
		fontSize: 18,
		fontWeight: 'bold',
	}
});
