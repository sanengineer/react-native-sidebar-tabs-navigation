import { StyleSheet } from "react-native";

export const ItemTabStyles = StyleSheet.create({
  tab: (bgColor) => ({
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    // height: 80,
    width: 90,
    paddingVertical: 20,
    marginVertical: 0,
    marginHorizontal: 0,
    backgroundColor: bgColor,
    overflow: "hidden",
    // paddingHorizontal: 30,
  }),
});

export const SidebarTabsStyles = StyleSheet.create({
  // header: {
  //   position: 'absolute',
  //   top: 0,
  // },

  tabContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    padding: 0,
    margin: 0,
    width: 90,
    backgroundColor: "red",
  },
  tabContainerScrollView: {
    // alignItems: 'center',
    // justifyContent: 'center',
    height: "100%",
    padding: 0,
    margin: 0,
    width: 90,
    backgroundColor: "yellow",
  },
});

export const SelectedViewStyles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    width: "100%",
    height: "50%",
    // justifyContent: "center",
    // alignItems: "center",
  },
});

export const MainViewStackStyles = StyleSheet.create({
  container: { flex: 1, flexDirection: "row", backgroundColor: "grey" },
});

export const SelectedViewStyles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    width: "100%",
    height: "50%",
    // justifyContent: "center",
    // alignItems: "center",
  },
});
