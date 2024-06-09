import {JSX} from 'react'
import {styled} from 'styled-components'
import {Link} from 'react-router-dom'

type ProfileStyledProps = {
    $imgSrc: string;
}

type ProfileProps = {
    imgSrc?: string;
}

const ProfileStyled = styled.div<ProfileStyledProps>`
  width: 4rem;
  height: 4rem;
  background-image: url(${(props: any) => props.$imgSrc}), linear-gradient(to top, black, black);
  background-position: center center;
  background-size: 100% 100%;
  object-fit: cover;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &::before {
    content: 'FM';
    color: white;
  }
`

export default function Profile(props: ProfileProps): JSX.Element {
    const {
        imgSrc = '/icons/profile.jpg'
    } = props

    return (
        <Link to={'/'}>
            <ProfileStyled $imgSrc={imgSrc}/>
        </Link>
    )
}