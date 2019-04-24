import React from 'react'
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import {
    createAppContainer,
    createStackNavigator,
    createSwitchNavigator,
    createBottomTabNavigator
} from 'react-navigation'

import { AsyncStorage } from 'react-native'
// I C O N
import Icon from "react-native-vector-icons/FontAwesome"
import MaterialIcon from "react-native-vector-icons/MaterialIcons"
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

// S C R E E N
import Login from '../Screens/Login'
import RegisterForm from '../Screens/RegisterForm'
import Home from '../Screens/Home'
import ExpoCameraScreen from '../Screens/ExpoCameraScreen'
import Collection from '../Screens/Collection'
import Detail from '../Screens/Detail';
import Iot from '../Screens/Iot';
import Account from '../Screens/Account';
import PaperMap from '../Screens/papermap'
import MetalMap from '../Screens/MetalMap'
import GlassMap from '../Screens/GlassMap'
import CardboardMap from '../Screens/CardboardMap'
import PlasticMap from '../Screens/PlasticMap'


const LoginStackNav = createStackNavigator({
    LoginPage: {
        screen: Login,
        navigationOptions: {
            drawBehind: true,
            header: null
        }
    },
    Register: {
        screen: RegisterForm
    },

}, {
        initialRouteName: 'LoginPage'
    })



const HomeNav = createStackNavigator({
    Home: {
        screen: Home
    }
})

const CollectionNav = createStackNavigator({
    Collection: {
        screen: Collection
    }
})

const PictureNav = createStackNavigator({
    Picture: {
        screen: ExpoCameraScreen,
        navigationOptions: {
            header: null
        }
    }
})

const mapStack = createStackNavigator({
    Maps: {
        screen: Detail,
        navigationOptions: {
            header: null
        }
    },
    PaperMap: {
        screen: PaperMap,
        navigationOptions: {
            header: null
        }
    },
    MetalMap: {
        screen: MetalMap,
        navigationOptions: {
            header: null
        }
    },
    GlassMap: {
        screen: GlassMap,
        navigationOptions: {
            header: null
        }
    },
    CardboardMap: {
        screen: CardboardMap,
        navigationOptions: {
            header: null
        }
    },
    PlasticMap: {
        screen: PlasticMap,
        navigationOptions: {
            header: null
        }
    }

}, {
    initialRouteName: 'Maps',
})

const HomeRoute = createBottomTabNavigator({

    Home: {
        screen: HomeNav,
        navigationOptions: {
            showLabel: false,
            tabBarLabel: 'Home',
            tabBarIcon: ({ tintColor }) => (<Icon name="home" color={tintColor} size={24} />)
        }
    },
    Camera: {
        screen: PictureNav,
        navigationOptions: {
            tabBarLabel: 'Camera',
            tabBarIcon: ({ tintColor }) => (<Icon name="camera" color={tintColor} size={24} />)
        }
    },
    Collection: {
        screen: CollectionNav,
        navigationOptions: {
            tabBarLabel: 'Collection',
            tabBarIcon: ({ tintColor }) => (<MaterialIcon name="collections" color={tintColor} size={24} />)
        }
    },
    Maps: {
        screen: mapStack,
        navigationOptions: {
            tabBarLabel: 'Maps',
            tabBarIcon: ({ tintColor }) => (<MaterialCommunityIcons name="map-marker-multiple" color={tintColor} size={24} />)
        }
    },
    Iot: {
        screen: Iot,
        navigationOptions: {
            tabBarLabel: 'IoT',
            tabBarIcon: ({ tintColor }) => (<MaterialIcons name="device-hub" color={tintColor} size={24} />)
        }
    },
    Account: {
        screen: Account,
        navigationOptions: {
            tabBarLabel: '',
            tabBarIcon: ({ tintColor }) => (
                <MaterialIcons
                    name="account-circle"
                    color={tintColor}
                    size={24} />)
        }
    }
}, {
        initialRouteName: 'Maps',
        tabBarOptions: {
            activeTintColor: 'gold',
            inactiveTintColor: 'white',
            style: {
                backgroundColor: '#2d3436',
                height: 60
            },
            showIcon: true
        }
    })

const switchAuth = createSwitchNavigator({
    FirstRender: {
        screen: LoginStackNav
    },
    ContentPage: {
        screen: HomeRoute
    }
}, {
        initialRouteName: 'FirstRender',
    })

export default createAppContainer(switchAuth)