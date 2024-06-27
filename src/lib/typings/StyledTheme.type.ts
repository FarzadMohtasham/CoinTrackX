export type StyledThemeProps = {
    breakpoints: {
        xsm: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        xxl: string;
    },
    colors: {
        primary: {
            color_primary: string;
            color_primary_50: string;
            color_primary_100: string;
            color_primary_200: string;
            color_primary_300: string;
            color_primary_400: string;
            color_primary_500: string;
            color_primary_600: string;
            color_primary_700: string;
            color_primary_800: string;
            color_primary_900: string;
        },
        secondary: {
            color_secondary: string;
            color_secondary_50: string;
            color_secondary_100: string;
            color_secondary_200: string;
            color_secondary_300: string;
            color_secondary_400: string;
            color_secondary_500: string;
            color_secondary_600: string;
            color_secondary_700: string;
            color_secondary_800: string;
            color_secondary_900: string;
        },
        black: {
            color_black: string;
            color_black_50: string;
            color_black_100: string;
            color_black_200: string;
            color_black_300: string;
            color_black_400: string;
            color_black_500: string;
            color_black_600: string;
            color_black_700: string;
            color_black_800: string;
            color_black_900: string;
        },
        white: {
            color_white: string;
            color_white_50: string;
            color_white_100: string;
            color_white_200: string;
            color_white_300: string;
            color_white_400: string;
            color_white_500: string;
            color_white_600: string;
            color_white_700: string;
            color_white_800: string;
            color_white_900: string;
        },
        danger: {
            color_danger: string;
            color_danger_50: string;
            color_danger_100: string;
            color_danger_200: string;
            color_danger_300: string;
            color_danger_400: string;
            color_danger_500: string;
            color_danger_600: string;
            color_danger_700: string;
            color_danger_800: string;
            color_danger_900: string;
        },
        success: {
            color_success: string;
            color_success_50: string;
            color_success_100: string;
            color_success_200: string;
            color_success_300: string;
            color_success_400: string;
            color_success_500: string;
            color_success_600: string;
            color_success_700: string;
            color_success_800: string;
            color_success_900: string;
        }
    },
    notif: {
        icon_wrapper_bg_color: string;
        border_color: string;
        success_color: string;
        error_color: string;
        info_color: string;
        warning_color: string;
        notifs_container_bg_color: string;
    }
}