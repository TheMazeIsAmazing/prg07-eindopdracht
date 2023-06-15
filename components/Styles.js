import {StyleSheet} from "react-native";
//https://coolors.co/palette/f94144-f3722c-f8961e-f9c74f-90be6d-43aa8b-577590
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF1E3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentContainer: {
        flex: 1,
    },
    navbarButtonActive: {
        backgroundColor:'#F9C74F',
        color: '#577590',
        padding: 15,
        width: "20%",
        borderRadius: 20,
        textAlign: 'center',
    },
    navbarButton: {
        backgroundColor:'#577590',
        color:  "#FFFAF0",
        padding: 15,
        width: "20%",
        borderRadius: 15,
        textAlign: 'center',
    },
    navbar: {
        backgroundColor:'#fff1f1',
        flexDirection: "row",
        gap: 30,
        paddingBottom: 10,
        paddingTop: 10,
        borderTopColor: '#577590',
        borderTopWidth: .5,
        borderStyle: 'dashed',
        width: '100%',
        justifyContent: "center",
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
        borderRadius: 15,
    },
    itemPriceCategoryTwo: {
        backgroundColor: '#90BE6D',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 8,
        borderRadius: 15,
    },
    itemPriceCategoryThree: {
        backgroundColor: '#F9C74F',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 8,
        borderRadius: 15,
    },
    itemPriceCategoryFour: {
        backgroundColor: '#F8961E',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 8,
        borderRadius: 15,
    },
    itemPriceCategoryFive: {
        backgroundColor: '#F3722C',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 8,
        borderRadius: 15,
    },
    itemPriceCategorySix: {
        backgroundColor: '#F94144',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 8,
        borderRadius: 15,
    },
    flatList: {
        width: 350
    },
    heading: {
        fontSize: 30
    }
});
