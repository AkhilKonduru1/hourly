import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../context/AuthContext';
import { colors, radii, fonts } from '../theme';

// Auth Screens
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import UserTypeSelection from '../screens/auth/UserTypeSelection';

// Student Screens
import StudentHomeScreen from '../screens/student/StudentHomeScreen';
import OpportunityDetailsScreen from '../screens/student/OpportunityDetailsScreen';
import StudentProfileScreen from '../screens/student/StudentProfileScreen';

// Organization Screens
import OrgDashboardScreen from '../screens/organization/OrgDashboardScreen';
import PostOpportunityScreen from '../screens/organization/PostOpportunityScreen';
import ManageHoursScreen from '../screens/organization/ManageHoursScreen';
import ReportsScreen from '../screens/organization/ReportsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function FloatingTabBar({ state, descriptors, navigation }) {
  return (
    <View style={tabStyles.wrapper}>
      <View style={tabStyles.container}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          let icon;
          if (route.name === 'Home' || route.name === 'Dashboard') {
            icon = '🏠';
          } else if (route.name === 'StudentProfile') {
            icon = '👤';
          } else if (route.name === 'ManageHours') {
            icon = '✓';
          } else if (route.name === 'Reports') {
            icon = '📊';
          }

          return (
            <TouchableOpacity
              key={route.key}
              style={[
                tabStyles.navItem,
                isFocused && tabStyles.navItemActive,
              ]}
              onPress={onPress}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
            >
              <Text
                style={[
                  tabStyles.navIcon,
                  isFocused && tabStyles.navIconActive,
                ]}
              >
                {icon}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const tabStyles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 8,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 40,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  navItem: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navItemActive: {
    backgroundColor: colors.textPrimary,
  },
  navIcon: {
    fontSize: 18,
  },
  navIconActive: {
    fontSize: 18,
  },
});

function StudentTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <FloatingTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={StudentHomeScreen} />
      <Tab.Screen
        name="StudentProfile"
        component={StudentProfileScreen}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
}

function OrganizationTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <FloatingTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Dashboard" component={OrgDashboardScreen} />
      <Tab.Screen
        name="ManageHours"
        component={ManageHoursScreen}
        options={{ title: 'Approve Hours' }}
      />
      <Tab.Screen name="Reports" component={ReportsScreen} />
    </Tab.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="UserTypeSelection" component={UserTypeSelection} />
    </Stack.Navigator>
  );
}

function StudentStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="StudentTabs"
        component={StudentTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OpportunityDetails"
        component={OpportunityDetailsScreen}
        options={{
          title: 'Details',
          headerStyle: { backgroundColor: colors.bgBody },
          headerTintColor: colors.textPrimary,
          headerTitleStyle: {
            fontFamily: fonts.serif,
            fontWeight: '400',
            fontSize: 18,
          },
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}

function OrganizationStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="OrgTabs"
        component={OrganizationTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PostOpportunity"
        component={PostOpportunityScreen}
        options={{
          title: 'New Opportunity',
          headerStyle: { backgroundColor: colors.bgBody },
          headerTintColor: colors.textPrimary,
          headerTitleStyle: {
            fontFamily: fonts.serif,
            fontWeight: '400',
            fontSize: 18,
          },
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  const { isAuthenticated, user } = useAuth();

  return (
    <NavigationContainer>
      {!isAuthenticated ? (
        <AuthStack />
      ) : user?.userType === 'student' ? (
        <StudentStack />
      ) : (
        <OrganizationStack />
      )}
    </NavigationContainer>
  );
}
