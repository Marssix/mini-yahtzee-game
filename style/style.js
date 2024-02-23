import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    marginTop: 30,
    marginBottom: 15,
    backgroundColor: '#F64DFC',
    flexDirection: 'row',
  },
  footer: {
    position: 'absolute',
    zIndex: 1,
    bottom: 79,
    left: 0,
    right: 0,
    marginTop: 20,
    backgroundColor: '#F64DFC',
    flexDirection: 'row'
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 23,
    textAlign: 'center',
    margin: 10,
  },
  author: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
  gameboard: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gameinfo: {
    backgroundColor: '#fff',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 10
  },
  row: {
    marginTop: 20,
    padding: 10
  },
  flex: {
    flexDirection: "row"
  },
  button: {
    margin: 30,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#62E8EA",
    width: 150,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color:"#2B2B52",
    fontSize: 20
  },
  scoreCategory: {
    width: 50, 
    height: 100, 
    borderRadius: 75, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#63d66e', 
  },
  scoreboardContainer: {
    backgroundColor: '#63d66e',
    borderRadius: 10, 
    padding: 20, // Increase padding for better spacing
    alignItems: 'center', 
    marginTop: 20, 
    minHeight: 100, // Reduce minHeight to ensure visibility of text
    justifyContent: 'center', // Align content to the top
  },
  scoreboardText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold', 
    fontFamily: 'Arial', 
    padding: 20,
    marginBottom: 300, // Increase marginBottom for better spacing
    textAlign: 'center', // Center the text horizontally
    top: 0, // Align the text to the top of the container
  },
});
