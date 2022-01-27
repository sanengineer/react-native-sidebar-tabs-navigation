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
    backgroundColor: "#F0F0F0",
  },
  tabContainerScrollView: {
    // alignItems: 'center',
    // justifyContent: 'center',
    height: "100%",
    padding: 0,
    margin: 0,
    width: 90,
    // backgroundColor: "yellow",
  },
});

export const MainViewStackStyles = StyleSheet.create({
  container: { flex: 1, flexDirection: "row", backgroundColor: "grey" },
});

export const SelectedViewStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    width: "100%",
    // height: "50%",
    // justifyContent: "center",
    // alignItems: "center",
  },
});

export const SelectedFlatlistStyles = StyleSheet.create({
  main: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 10,
    paddingVertical: 10,
    flex: 1,
  },
  columnWrapper: {
    // backgroundColor:"orange",
    // paddingVertical:30,
    marginBottom: 30,
    height: 100,
  },
  contentContainer: {
    alignItems: "flex-start",
    //  backgroundColor:"red",
    justifyContent: "center",
    alignContent: "center",
    padding: 5,
  },
});

export const ChildItemStyles = StyleSheet.create({
  container: {
    // backgroundColor:"blue",
    height: 100,
    width: 80,
    marginHorizontal: 3,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  img: { width: 50, height: 50 },
  title: { fontSize: 12, color: "black", textAlign: "center", marginTop: 10 },
});
