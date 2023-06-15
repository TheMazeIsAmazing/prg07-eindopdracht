import {StyleSheet} from "react-native";
//https://coolors.co/palette/f94144-f3722c-f8961e-f9c74f-90be6d-43aa8b-577590
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentContainer: {
        flex: 1,
    },
    navbarButtonActive: {
        backgroundColor:'#F9C74F',
        height: 30,
        width: "20%",
        alignItems: "center",
    },
    navbarButton: {
        backgroundColor:'#c0c0c0',
        height: 30,
        width: "20%",
        alignItems: "center",
    },
    navbarButtonText: {
        color:  "black"
    },
    navbar: {
        flexDirection: "row",
        gap: 30,
        paddingBottom: 10
    },
    map: {
        width: '100%',
        height: '100%',
    },
    itemPriceCategoryOne: {
        backgroundColor: '#43AA8B',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 8,
    },
    itemPriceCategoryTwo: {
        backgroundColor: '#90BE6D',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 8,
    },
    itemPriceCategoryThree: {
        backgroundColor: '#F9C74F',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 8,
    },
    itemPriceCategoryFour: {
        backgroundColor: '#F8961E',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 8,
    },
    itemPriceCategoryFive: {
        backgroundColor: '#F3722C',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 8,
    },
    itemPriceCategorySix: {
        backgroundColor: '#F94144',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 8,
    },
    flatList: {
        width: 350
    }
});
