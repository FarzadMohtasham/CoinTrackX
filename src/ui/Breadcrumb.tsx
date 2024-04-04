import {useLocation, Location, Link} from "react-router-dom";

export default function Breadcrumb() {
    const location: Location<any> = useLocation()

    let currentLink: string = ''

    const crumbs = location.pathname.split('/')
        .filter(crumb => crumb !== '')
        .map((crumb, index) => {
            currentLink += `/${crumb}`

            return (
                <Link to={currentLink} key={crumb + index}>
                    {index === 0 ? '' : ' > '}
                    {crumb}
                </Link>
            )
        })

    return (
        <div className={'breadcrumbs'}>
            {crumbs}
        </div>
    )
}