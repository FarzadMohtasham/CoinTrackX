import { JSX } from 'react';
import { useLocation, Location, Link } from 'react-router-dom';

export default function Breadcrumb(): JSX.Element {
  const location: Location<any> = useLocation();

  let currentLink: string = '';

  const crumbs = location.pathname
    .split('/')
    .filter((crumb: string): boolean => crumb !== '')
    .map((crumb: string, index: number) => {
      currentLink += `/${crumb}`;

      return (
        <Link to={currentLink} key={crumb + index}>
          {index === 0 ? '' : ' > '}
          {crumb}
        </Link>
      );
    });

  return <div className={'breadcrumbs'}>{crumbs}</div>;
}
