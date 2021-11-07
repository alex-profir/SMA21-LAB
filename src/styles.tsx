import { Dimensions, ImageStyle, StyleSheet, PixelRatio, StyleProp, TextStyle, ViewStyle } from "react-native";

export const { width, height } = Dimensions.get('window');
export const dpi = PixelRatio.get();

type StyleType = ViewStyle | TextStyle | ImageStyle;

function style<T extends StyleType>(style: T) {
    return style;
}

export function toStyleArray<T>(style: StyleProp<T>) {
    return style && 'map' in style ? style : [style]
}

export function px(value: number) {
    return value * width / 400;
}

export function mediaQuery<T extends StyleType>(condition: boolean, value: T): T | {} {
    return condition ? value : {};
}

export function size(width: number, height?: number) {
    return {
        width: px(width),
        height: px(height ?? width)
    }
}
export const textStyle = style({
    color: "#2ECB70",
    fontSize: px(14)
})
export const g = StyleSheet.create({
    screen: {
        ...mediaQuery(dpi > 1.5, {
            marginTop: px(20),
        }),
    },
    fieldText: {
        ...textStyle,
        marginBottom: px(10),
        fontSize: px(17),
    },
})