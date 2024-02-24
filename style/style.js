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
    justifyContent: 'center'
  },
  footer: {
    position: 'absolute',
    zIndex: 1,
    bottom: 79,
    left: 0,
    right: 0,
    marginTop: 20,
    backgroundColor: '#F64DFC',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center'
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
    backgroundColor: "#63d66e",
    width: 150,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100,
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
    backgroundColor: '#975CF2',
    borderRadius: 10, 
    padding: 20, // Increase padding for better spacing
    marginTop: 10, 
    height: 400,
    justifyContent: 'top', // Align content to the top
  },
  scoreboardText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold', 
    fontFamily: 'Arial', 
    paddingTop: 3,
    marginBottom: 3, // Increase marginBottom for better spacing
    top: 0, // Align the text to the top of the container
    paddingLeft: 5,
    
  },
  rulesText: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold', 
    fontFamily: 'Arial',
    textAlign: 'center',
    padding: 7,
  },
  topScoresText: {
    color: 'black',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scoreHeader:{
    marginTop: 10,
    marginBottom: 15,
    flexDirection: 'row',
  },
  scoreLabel:{
    paddingHorizontal: 35,
    fontWeight: 'bold',
  },
clearButton:{
  margin: 30,
    flexDirection: "row",
    padding: 10,
    marginTop: 50,
    backgroundColor: "#FF0059",
    width: 150,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
},
clearButtonText: {
  color:"#fff",
  fontSize: 20
},
nameInput:{
  height: 40,
    width: 200,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    textAlign: 'center',
},
welcomeText:{
  fontSize: 30,
  fontStyle: 'italic',
  color: '#18C00D',
},
horizontal: {
  flexDirection: 'row',
  paddingLeft: 15,
  alignItems: 'center',
},
});