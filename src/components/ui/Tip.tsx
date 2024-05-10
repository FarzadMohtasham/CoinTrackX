import React, {useState} from 'react'

import styles from './Tip.module.scss'

// Types
import {TipPropsType} from "../../ts/type/TipProps.type.ts";

export default function Tip(props: TipPropsType): React.JSX.Element | undefined {
    const [hide, setHide]: [hide: boolean, setHide: any] = useState(false)

    const {
        children,
        extended = false,
        // closable = false,
        redirect = true,
        // link = '',
        // replaceHistory = false,
    } = props

    if (hide) return

    const divStyle: object = {
        width: extended ? '100%' : 'max-content',
        cursor: redirect ? 'pointer' : ''
    }

    const closeIconStyle: object = {
        display: redirect ? 'none' : ''
    }

    function onCloseHandler(): void {
        setHide(true)
    }

    function onRedirectHandler(): void {
        if (!redirect) return

        // redirect('')
    }

    return (
        <div className={styles.tip} style={divStyle} onClick={onRedirectHandler}>
            <p>{children}</p>
            <i className={'close-icon'} style={closeIconStyle} onClick={onCloseHandler}>&times;</i>
            {
                redirect && <i className={'redirect-icon'}>
                    <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.5 15L8.5 8L1.5 1" stroke="#9C9CAB" strokeWidth="1.5" strokeLinecap="round"
                              strokeLinejoin="round"/>
                    </svg>
                </i>
            }
        </div>
    )
}













