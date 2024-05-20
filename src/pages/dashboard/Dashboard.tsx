import {styled} from "styled-components"
import PortfolioSummary from "@components/dashboard/PortfolioSummary.tsx";

const DashboardContainer = styled.div`
  display: grid;
  place-content: center;
`

export default function Dashboard() {
    return (
        <DashboardContainer>
            <PortfolioSummary/>
        </DashboardContainer>
    )
}