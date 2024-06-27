import {ReactNode} from "react";
import {Link} from "react-router-dom"
import {styled} from "styled-components"

import Icon from "@components/ui/stuff/Icon.tsx";

type GoBackProps = {
    link: string;
    children?: ReactNode;
}

const GoBackContainer = styled.div`
    a.go-back-link {
        display: flex;
        align-items: center;
        gap: 5px;
    }
`

const GoBackSpan = styled.span`
    font-size: var(--font-size-body-sm);
`

export default function GoBack(props: GoBackProps) {
    return (
        <GoBackContainer>
            <Link to={props.link} className={'go-back-link'}>
                <Icon iconSrc={'arrow-left-black.svg'} width={'15px'}/>
                <GoBackSpan>
                    {props.children}
                </GoBackSpan>
            </Link>
        </GoBackContainer>
    )
}