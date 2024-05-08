import {styled} from "styled-components";
import {Outlet} from 'react-router-dom'

const LayoutContainer = styled.div``
const LayoutHeader = styled.div``
const LayoutSection = styled.div``
const LayoutMain = styled.div``

export default function DashboardLayout() {
    return (
        <LayoutContainer>
            <LayoutHeader>

            </LayoutHeader>

            <LayoutSection>

            </LayoutSection>

            <LayoutMain>
                <Outlet/>
            </LayoutMain>
        </LayoutContainer>
    )
}