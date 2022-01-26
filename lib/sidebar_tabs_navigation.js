import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import {
  createAppContainer,
  createNavigator,
  TabRouter,
} from "react-navigation";
import {
  ItemTabStyles as _tabStyles,
  MainViewStackStyles as _mainStyles,
  SidebarTabsStyles as _sidebarStyles,
} from "./styles";

const _protoSync = (arr) => {
  return arr.map((i) => {
    // const { text, iconUrl, id } = i;
    const _routeName = i.text;
    const _icon = i.iconUrl;
    const _id = i.id;

    const _noSpaceRouteName = _routeName
      .split(" ")
      .join("")
      .replace(/&/gsu, "And");

    const _protoMap = [
      _noSpaceRouteName,
      {
        params: {
          icon: _icon,
          tabName: _routeName,
          id: _id,
        },
        screen: () => <SelectedView name={_routeName} />,
      },
    ];

    return _protoMap;
  });
};

const _data = (data) => {
  return Object.fromEntries(_protoSync(data));
};

const routeSetupData = (data) => {
  const _dict = _data(data);
  const _array = [_dict, { initialRouteName: `${Object.keys(_dict)[0]}` }];

  return _array;
};

const ItemTab = ({ route, tabIndex, index, navigation }) => {
  const { routeName, params } = route;
  const { icon, tabName, id } = params || {};
  const color = tabIndex === index ? "white" : "#00000050";
  const bgColor = tabIndex === index ? "blue" : "yellow";
  const fontSize = 11;
  const fontWeight = tabIndex === index ? "bold" : "200";

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(routeName, id)}
      style={_tabStyles.tab(bgColor)}
      key={route.routeName}
    >
      <Image source={{ uri: `${icon}` }} height={30} width={30} />
      <View style={{ flex: 1 }}>
        <Text style={{ color, fontSize, fontWeight }}>{tabName}</Text>
      </View>
    </TouchableOpacity>
  );
};

const SidebarTabs = ({ navigation }) => {
  const { routes, index } = navigation.state;

  return (
    <View style={_sidebarStyles.tabContainer}>
      <ScrollView
        style={_sidebarStyles.tabContainerScrollView}
        showsVerticalScrollIndicator={false}
      >
        {routes.map((route, tabIndex) => {
          return (
            <ItemTab
              route={route}
              tabIndex={tabIndex}
              index={index}
              navigation={navigation}
              key={tabIndex}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const SidebarTabsNavigator = ({ navigation, descriptors }) => {
  const { routes, index } = navigation.state;
  const descriptor = descriptors[routes[index].key];

  const ActiveScreen = descriptor.getComponent();

  return (
    <View style={_mainStyles.container}>
      <SidebarTabs navigation={navigation} descriptors={descriptors} />
      <ActiveScreen navigation={descriptor.navigation} />
    </View>
  );
};

const createSidebarTabsNavigator = (
  routeConfigMap,
  sidebarTabsNavigatorConfig
) => {
  const customTabRouter = TabRouter(routeConfigMap, sidebarTabsNavigatorConfig);

  return createNavigator(SidebarTabsNavigator, customTabRouter, {});
};

const sidebarTabsNavigator = (_dataRaw) => {
  const resultFn = routeSetupData(_dataRaw);
  const normalize = resultFn[0];

  return createSidebarTabsNavigator(normalize);
};

const Navigation = ({ _dataRoute }) => {
  const AppContainer = createAppContainer(sidebarTabsNavigator(_dataRoute));

  return <AppContainer />;
};

export default Navigation;
