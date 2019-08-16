import * as React from "react";
import { Platform, SafeAreaView, StyleSheet } from "react-native";
import * as Animatable from 'react-native-animatable';




const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		backgroundColor: "#F5FCFF",
		flex: 1,
		justifyContent: "center"
	}
});

const App = () => {
	return (
		<SafeAreaView style={styles.container}>
			<Animatable.Text animation="slideInDown" iterationCount={5} direction="alternate">Up and down you go</Animatable.Text>

		</SafeAreaView>
	);
};

export default App
