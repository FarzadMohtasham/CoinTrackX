import {StyledThemeProps} from '@ts/type/StyledTheme.type.ts'

const defaultProps: StyledThemeProps = {
    responsive: {
        xsm: '27.4rem',
        sm: '57.6rem',
        md: '76.8rem',
        lg: '99.2rem',
        xl: '120.0rem',
        xxl: '140.0rem',
    },
    colors: {
        primary: {
            color_primary: '#5235E8',
            color_primary_50: 'rgba(82, 53, 232, 0.05)',
            color_primary_100: 'rgba(82, 53, 232, 0.1)',
            color_primary_200: 'rgba(82, 53, 232, 0.2)',
            color_primary_300: 'rgba(82, 53, 232, 0.3)',
            color_primary_400: 'rgba(82, 53, 232, 0.4)',
            color_primary_500: 'rgba(82, 53, 232, 0.5)',
            color_primary_600: 'rgba(82, 53, 232, 0.6)',
            color_primary_700: 'rgba(82, 53, 232, 0.7)',
            color_primary_800: 'rgba(82, 53, 232, 0.8)',
            color_primary_900: 'rgba(82, 53, 232, 0.9)',
        },
        secondary: {
            color_secondary: '#DAF727',
            color_secondary_50: 'rgba(218, 247, 39, 0.05)',
            color_secondary_100: 'rgba(218, 247, 39, 0.1)',
            color_secondary_200: 'rgba(218, 247, 39, 0.2)',
            color_secondary_300: 'rgba(218, 247, 39, 0.3)',
            color_secondary_400: 'rgba(218, 247, 39, 0.4)',
            color_secondary_500: 'rgba(218, 247, 39, 0.5)',
            color_secondary_600: 'rgba(218, 247, 39, 0.6)',
            color_secondary_700: 'rgba(218, 247, 39, 0.7)',
            color_secondary_800: 'rgba(218, 247, 39, 0.8)',
            color_secondary_900: 'rgba(218, 247, 39, 0.9)',
        },
        black: {
            color_black: '#0E0637',
            color_black_50: 'rgba(14, 6, 55, 0.05)',
            color_black_100: 'rgba(14, 6, 55, 0.1)',
            color_black_200: 'rgba(14, 6, 55, 0.2)',
            color_black_300: 'rgba(14, 6, 55, 0.3)',
            color_black_400: 'rgba(14, 6, 55, 0.4)',
            color_black_500: 'rgba(14, 6, 55, 0.5)',
            color_black_600: 'rgba(14, 6, 55, 0.6)',
            color_black_700: 'rgba(14, 6, 55, 0.7)',
            color_black_800: 'rgba(14, 6, 55, 0.8)',
            color_black_900: 'rgba(14, 6, 55, 0.9)',
        },
        white: {
            color_white: '#FFF',
            color_white_50: 'rgba(255, 255, 255, 0.05)',
            color_white_100: 'rgba(255, 255, 255, 0.1)',
            color_white_200: 'rgba(255, 255, 255, 0.2)',
            color_white_300: 'rgba(255, 255, 255, 0.3)',
            color_white_400: 'rgba(255, 255, 255, 0.4)',
            color_white_500: 'rgba(255, 255, 255, 0.5)',
            color_white_600: 'rgba(255, 255, 255, 0.6)',
            color_white_700: 'rgba(255, 255, 255, 0.7)',
            color_white_800: 'rgba(255, 255, 255, 0.8)',
            color_white_900: 'rgba(255, 255, 255, 0.9)',
        },
        danger: {
            color_danger: '#ff2e28',
            color_danger_50: 'rgba(255, 46, 40, 0.05)',
            color_danger_100: 'rgba(255, 46, 40, 0.1)',
            color_danger_200: 'rgba(255, 46, 40, 0.2)',
            color_danger_300: 'rgba(255, 46, 40, 0.3)',
            color_danger_400: 'rgba(255, 46, 40, 0.4)',
            color_danger_500: 'rgba(255, 46, 40, 0.5)',
            color_danger_600: 'rgba(255, 46, 40, 0.6)',
            color_danger_700: 'rgba(255, 46, 40, 0.7)',
            color_danger_800: 'rgba(255, 46, 40, 0.8)',
            color_danger_900: 'rgba(255, 46, 40, 0.9)',
        },
        success: {
            color_success: '#11CF8B',
            color_success_50: 'rgba(17, 207, 139, 0.05)',
            color_success_100: 'rgba(17, 207, 139, 0.1)',
            color_success_200: 'rgba(17, 207, 139, 0.2)',
            color_success_300: 'rgba(17, 207, 139, 0.3)',
            color_success_400: 'rgba(17, 207, 139, 0.4)',
            color_success_500: 'rgba(17, 207, 139, 0.5)',
            color_success_600: 'rgba(17, 207, 139, 0.6)',
            color_success_700: 'rgba(17, 207, 139, 0.7)',
            color_success_800: 'rgba(17, 207, 139, 0.8)',
            color_success_900: 'rgba(17, 207, 139, 0.09)',
        }
    },
    notif: {
        icon_wrapper_bg_color: '#f2f2f2',
        border_color: '#DCDCDC',
        success_color: '#EFFEF5',
        error_color: '#FFF0F0',
        info_color: '#EDF9FF',
        warning_color: '#FFF7ED',
        notifs_container_bg_color: '#f8f8f8',
    }
}

const styledComponentTheme = {
    lightTheme: {...defaultProps},
    darkTheme: {...defaultProps}
}

export default styledComponentTheme