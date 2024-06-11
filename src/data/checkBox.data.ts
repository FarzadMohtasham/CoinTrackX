import {css} from 'styled-components'

const checkBoxData = {
    primary: {
        active: css`var(--color-primary)`,
        'active-inner': `#fff`,
        focus: `2px rgba(39, 94, 254, .3)`,
        border: `#BBC1E1`,
        'border-hover': `#275EFE`,
        background: `#fff`,
        disabled: `#F6F8FF`,
        'disabled-inner': `#E1E6F9`,
    },
    danger: {
        active: css`var(--color-danger)`,
        'active-inner': `#fff`,
        focus: `2px rgba(39, 94, 254, .3)`,
        border: `#BBC1E1`,
        'border-hover': `#275EFE`,
        background: `#fff`,
        disabled: `#F6F8FF`,
        'disabled-inner': `#E1E6F9`,
    },
    black: {
        active: css`var(--color-black)`,
        'active-inner': `#fff`,
        focus: `2px rgba(39, 94, 254, .3)`,
        border: `#BBC1E1`,
        'border-hover': `#275EFE`,
        background: `#fff`,
        disabled: `#F6F8FF`,
        'disabled-inner': `#E1E6F9`,
    }
}

export default checkBoxData