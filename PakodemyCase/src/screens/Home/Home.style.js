import {StyleSheet} from "react-native";
import {COLORS, FONTS, SIZES} from "../../constants/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        ...FONTS.h3,
        color: COLORS.lightBrown,

    }
})
export default styles
