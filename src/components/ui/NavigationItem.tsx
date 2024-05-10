import Icon from "./Icon.tsx";
import {css, styled} from "styled-components";
import {NavigationProps, NavigationItemStyledProps} from "../../ts/type/NavigationItem.type.ts"

const NavigationItemContainer = styled.div<NavigationItemStyledProps>`
  display: flex;
  align-items: center;
  gap: .8rem;
  cursor: pointer;
  padding: 1.4rem 0 1.4rem 1.2rem;
  width: 100%;
  transition: all .3s ease-in-out;
  border: .2rem white solid;

  ${props => props.$active && css`
    background-color: var(--color-primary-50);
    border-radius: .8rem;
    border: .2rem var(--color-black-50) solid !important;
  `}
  span {
    font-size: var(--font-size-body-sm);
    color: var(${props => props.$active ? `--color-black-900` : `--color-black-600`});
    font-weight: ${props => props.$active ? `bold` : '400'};
  }
`

export default function NavigationItem(props: NavigationProps) {
    const {
        children = 'undefined children',
        icon_src,
        active_icon_src,
        icon_alt = 'navigation-icon',
        active = false,
        icon_width = '20rem',
        on_click,
    } = props

    return (
        <NavigationItemContainer $active={active}
                                 onClick={on_click}>
            <Icon icon_src={active ? active_icon_src : icon_src}
                  icon_alt={icon_alt}
                  width={icon_width}
            />
            <span>
                {children}
            </span>
        </NavigationItemContainer>
    )
}