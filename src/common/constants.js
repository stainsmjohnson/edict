import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';

//light theme
//background   #e4edfc
//dark background #cfdaec
//primary #6e8efb
//light text #a4b3cc
//dark text #6c7a93
//selection #d3e0f6

//dark theme
//primary  #E35F21
//background  #010506
//text #EEF8F7

export const DefaultTheme = {
  ...NavigationDefaultTheme,
  ...PaperDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
    primary: '#6e8efb',

    background: '#e4edfc',

    //card
    card: '#cfdaec',
    surface: '#cfdaec',
    //text
    text: '#6c7a93',
  },
};

export const DarkTheme = {
  ...NavigationDarkTheme,
  ...PaperDarkTheme,
  roundness: 6,
  colors: {
    ...NavigationDarkTheme.colors,
    ...PaperDarkTheme.colors,
    primary: '#E35F21',

    background: '#010506',

    //card
    card: '#121212',
    surface: '#121212',
    //text
    text: '#EEF8F7',
    // border : The color of borders, e.g. header border, tab bar border etc.
    // notification (string): The color of Tab Navigator badge.
  },
};

export const Theme = DarkTheme;

const MODAL_THEME = {
  animation: {scale: 1},
  colors: {
    accent: '#03dac4',
    backdrop: 'rgba(0, 0, 0, 0.5)',
    background: '#e4edfc',
    border: 'rgb(216, 216, 216)',
    card: '#cfdaec',
    disabled: 'rgba(0, 0, 0, 0.26)',
    error: '#B00020',
    notification: '#f50057',
    onBackground: '#000000',
    onSurface: '#000000',
    placeholder: 'rgba(0, 0, 0, 0.54)',
    primary: '#6e8efb',
    surface: '#cfdaec',
    text: '#6c7a93',
  },
  dark: false,
  fonts: {
    light: {fontFamily: 'sans-serif-light', fontWeight: 'normal'},
    medium: {fontFamily: 'sans-serif-medium', fontWeight: 'normal'},
    regular: {fontFamily: 'sans-serif', fontWeight: 'normal'},
    thin: {fontFamily: 'sans-serif-thin', fontWeight: 'normal'},
  },
  roundness: 4,
};
