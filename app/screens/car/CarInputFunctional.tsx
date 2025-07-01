import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import React from 'react';

interface Props {
  driver: string;
}

export function CarInputFunctional(props: Props) {
  const [year, onChangeYear] = React.useState('');
  const [make, onChangeMake] = React.useState('');
  const [model, onChangeModel] = React.useState('');

  const onPressSubmit = () => {
    onChangeYear('');
    onChangeMake('');
    onChangeModel('');

    if (year.length == 0 && make.length == 0 && model.length == 0) {
      Alert.alert('Nothing submitted');
    } else {
      console.log('Create logic here!');
    }

    /*
    if (year !== "" && make !== "" && model !== "")
      Alert.alert(`Your car is ${year} ${make} ${model}`);
    else if (year !== "" && make === "" && model === "")
      Alert.alert(`The year of your car is ${year}`);
    else if (year === "" && make !== "" && model === "")
      Alert.alert(`The make of your car is ${make}`);
    else if (year === "" && make === "" && model !== "")
      Alert.alert(`The model of your car is ${model}`);
    else if (year !== "" && make !== "" && model === "")
      Alert.alert(`The year and make of your car is: ${year} ${make}`);
    else if (year !== "" && make === "" && model !== "")
      Alert.alert(`The year and model of your car is: ${year} ${model}`);
    else if (year === "" && make !== "" && model !== "")
      Alert.alert(`The make and model of your car is: ${make} ${model}`);
    else
      Alert.alert("Nothing submitted :)"); */
  };

  return (
    <View style={styleSheet.carInputContainer}>
      <Text style={styleSheet.titleText}>
        {'Hello '}
        {props.driver}
        {'!'}
      </Text>
      <View style={styleSheet.innerContainer}>
        <View style={styleSheet.leftContainer}>
          <Text style={styleSheet.subTitleText}>{'Enter your car:'}</Text>
          <TextInput
            style={styleSheet.inputBox}
            onChangeText={onChangeYear}
            placeholder={'Enter the year of your car'}
            value={year}
            keyboardType={'numeric'}
          />
          <TextInput
            style={styleSheet.inputBox}
            onChangeText={onChangeMake}
            placeholder={'Enter the make of your car'}
            value={make}
          />
          <TextInput
            style={styleSheet.inputBox}
            onChangeText={onChangeModel}
            placeholder={'Enter the model of your car'}
            value={model}
          />
        </View>
        <View style={styleSheet.rightContainer}>
          <TouchableOpacity
            style={[styleSheet.button, { backgroundColor: 'plum' }]}
            onPress={onPressSubmit}>
            <Text style={styleSheet.buttonText}>{' Submit '}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// ===================================================================== //
// ==================== <<<<< Stylesheets >>>>> ======================== //
// ===================================================================== //

const styleSheet = StyleSheet.create({
  carInputContainer: {
    width: '100%',
    // borderWidth: 2,
    borderColor: 'green'
    // flex: 1,
    // borderWidth: 2,
  },
  innerContainer: {
    // borderWidth: 2,
    borderColor: 'blue',
    flexDirection: 'row'
  },
  leftContainer: {
    flex: 2,
    justifyContent: 'center',
    // borderWidth: 2,
    borderColor: 'purple'
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
    // borderWidth: 2,
    borderColor: 'red'
  },
  titleText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 40,
    color: 'black'
  },
  subTitleText: {
    textAlign: 'left',
    textAlignVertical: 'bottom',
    fontSize: 30,
    color: 'black'
  },
  inputBox: {
    // flex: 1,
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    width: '90%'
  },
  button: {
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5464d1', // Green color
    borderRadius: 50, // Circular button shape
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold'
  },
  inputText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold'
  }
}); // End of styles
