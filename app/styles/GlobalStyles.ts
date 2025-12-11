import { StyleSheet } from 'react-native';

export const GlobalStyles = StyleSheet.create({
  // Common
  marginTop: {
    marginTop: 50
  },
  marginTopSmall: {
    marginTop: 15
  },

  // Screen Container Styles
  safeAreaContainer: {
    alignItems: 'center',
    backgroundColor: '#bad1f5',
    flex: 1
  },
  screenContainer: {
    alignItems: 'center',
    flex: 1,
    marginTop: 40
  },
  scrollViewContainer: {
    flex: 1,
    marginBottom: 10,
    width: '100%'
  },
  scrollViewContentContainer: {
    alignItems: 'center',
    marginHorizontal: 10
  },
  flatListContainer: {
    flex: 1,
    marginTop: 20,
    marginBottom: 10,
    width: '100%'
  },
  flatListContentContainer: {
    alignItems: 'center'
  },
  keyboardAvoidingContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    marginTop: 20
  },

  // Text Styles
  titleText: {
    color: 'black',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  standardText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold'
  },

  // Image Styles
  image: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },

  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%'
  },

  // Input Box Styles
  inputBox: {
    backgroundColor: 'rgba(145, 171, 15, 0.4)',
    borderColor: '#ccc',
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 16,
    height: 60,
    width: '50%',
    paddingHorizontal: 15
  }
});
