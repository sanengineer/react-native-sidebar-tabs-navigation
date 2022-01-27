import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import {
  createAppContainer,
  createNavigator,
  TabRouter,
} from "react-navigation";
import {
  ItemTabStyles as _tabStyles,
  MainViewStackStyles as _mainStyles,
  SidebarTabsStyles as _sidebarStyles,
  SelectedViewStyles as _selectedStyles,
  SelectedFlatlistStyles as _flatStyles,
  ChildItemStyles as _childStyles,
} from "./styles";

const _protoSync = (arr, data, navToScreenName, navigation, apiGetData) => {
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
        screen: () => (
          <SelectedFlatlist
            id_parent={_id}
            parent_name={_routeName}
            data={data}
            navToScreenName={navToScreenName}
            navigation={navigation}
            apiGetData={apiGetData}
          />
        ),
      },
    ];

    return _protoMap;
  });
};

const _data = (data, _dataChild, navToScreenName, navigation, apiGetData) => {
  return Object.fromEntries(
    _protoSync(data, _dataChild, navToScreenName, navigation, apiGetData)
  );
};

const routeSetupData = (
  data,
  _dataChild,
  navToScreenName,
  navigation,
  apiGetData
) => {
  const _dict = _data(
    data,
    _dataChild,
    navToScreenName,
    navigation,
    apiGetData
  );
  const _array = [_dict, { initialRouteName: `${Object.keys(_dict)[0]}` }];

  return _array;
};

const ItemTab = ({ route, tabIndex, index, navigation }) => {
  const { routeName, params } = route;
  const { icon, tabName, id } = params || {};
  const color = tabIndex === index ? "#000000" : "#00000050";
  const bgColor = tabIndex === index ? "#ffffff" : "#f0f0f0";
  const fontSize = 11;
  const fontWeight = tabIndex === index ? "500" : "300";

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(routeName, id)}
      style={_tabStyles.tab(bgColor)}
      key={route.routeName}
    >
      <Image source={{ uri: `${icon}` }} style={{ width: 30, height: 30 }} />
      <View style={{ flex: 1 }}>
        <Text
          style={{
            color,
            fontSize,
            fontWeight,
            marginTop: 5,
            textAlign: "center",
          }}
        >
          {tabName}
        </Text>
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

const SelectedView = ({ name }) => {
  return (
    <ScrollView style={_selectedStyles.container}>
      <View>
        <Text style={{ color: "#000000" }}>Category List {name}</Text>
      </View>
    </ScrollView>
  );
};

const ChildCatItem = ({ item, onPress, index }) => {
  const { iconUrl, text, id } = item;

  return (
    <TouchableOpacity
      key={id}
      style={_childStyles.container}
      onPress={() => {
        onPress(id, text);
      }}
    >
      <Image
        source={{ url: `${iconUrl}` }}
        style={_childStyles.img}
        resizeMode="contain"
      />
      <Text style={_childStyles.title}>
        {text} {id}
      </Text>
    </TouchableOpacity>
  );
};

const SelectedFlatlist = ({
  data,
  id_parent,
  parent_name,
  navToScreenName,
  navigation,
  apiGetData = () => {},
}) => {
  const id = id_parent;
  const [dataFlat, setDataFlat] = useState([]);

  const onPressChild = (id_child, child_name) => {
    navigation.navigate(`${navToScreenName}`, {
      id: id_child,
      name: child_name,
      parent: {
        id: id,
        name: parent_name,
      },
    });
  };

  const _getData = (_id) => {
    apiGetData(_id)
      .then((res) => {
        setDataFlat(res.data);
      })
      .catch((err) => {
        console.log("ERR-LIB-NODE_MODULE-SIDEBAR", err);
      });
  };

  useEffect(() => {
    _getData(id);
  }, []);

  const renderItem = ({ item, index }) => {
    return <ChildCatItem item={item} index={index} onPress={onPressChild} />;
  };

  return (
    <FlatList
      style={_flatStyles.main}
      numColumns={3}
      columnWrapperStyle={_flatStyles.columnWrapper}
      data={dataFlat}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={_flatStyles.contentContainer}
    />
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

const sidebarTabsNavigator = (
  _dataRaw,
  _dataChild,
  navToScreenName,
  navigation,
  apiGetData
) => {
  const resultFn = routeSetupData(
    _dataRaw,
    _dataChild,
    navToScreenName,
    navigation,
    apiGetData
  );
  const normalize = resultFn[0];

  return createSidebarTabsNavigator(normalize);
};

const Navigation = ({
  _dataRoute,
  _dataChild,
  navToScreenName,
  navigation,
  apiGetData,
}) => {
  const AppContainer = createAppContainer(
    sidebarTabsNavigator(
      _dataRoute,
      _dataChild,
      navToScreenName,
      navigation,
      apiGetData
    )
  );

  return <AppContainer />;
};

export { Navigation as default, SelectedView, SidebarTabs, ItemTab };
