import {JSX, Ref, useEffect, useRef, useState} from 'react'
import {css, styled} from 'styled-components'

import Icon from '@components/ui/Icon.tsx'

import {
    SelectProps,
    SelectMenuItem as SelectMenuItemT,
    SelectedMenuItemProps,
    SelectMenuWrapperProps
} from '@ts/type/Select.type.ts'

const SelectContainer = styled.div<{ ref: Ref<HTMLElement | null> }>`
  width: max-content;
  display: block;
  position: relative;
`

const SelectBtnWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.1rem;
  padding: .8rem 1.6rem;
  border: .2rem solid var(--color-black-100);
  border-radius: .8rem;
  cursor: pointer;

  .selected-item-text {
    text-transform: uppercase;
    font-weight: 500;
    font-size: var(--font-size-body-sm);
  }
`

const SelectMenuWrapper = styled.ul<SelectMenuWrapperProps>`
  list-style: none;
  background-color: #2f343e;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: absolute;
  ${(props: any): string => props.$menuXDirStartPosition === 'right' ? 'right: 0' : 'left: 0'};
  top: 5rem;
  border-radius: .8rem;
  z-index: 99;

  li {
    padding: .8rem 10rem .8rem 1rem;
    color: white;
    cursor: pointer;
    font-weight: 400;
    font-size: var(--font-size-body-sm);
    min-width: max-content;
  }
`

const SelectMenuItem = styled.li<SelectedMenuItemProps>`
  display: flex;
  gap: 1rem;
  text-transform: uppercase;
  border-radius: .6rem;
  transition: background-color .3s ease-in-out;

  ${(props: any) => props.$selected && css`background-color: #22242a`};

  ${(props: any) => !props.$selected && css`
    &:hover {
      background-color: var(--color-white-50);
    }
  `}
`

export default function Select(props: SelectProps): JSX.Element {
    const {
        $menuItems: menuItems,
        $hasIcon: hasIcon = false,
        $closeAfterSelect = true,
        $menuXDirStartPosition = 'right',
        $newValueSetter,
    } = props

    const [selectedItem, setSelectedItem] = useState<null | SelectMenuItemT>(null)
    const [selectMenuIsOpen, setSelectMenuIsOpen] = useState<boolean>(false)
    const selectRef = useRef<HTMLElement | null>(null);

    const handleSelectBtn = (): void => {
        if (selectMenuIsOpen) setSelectMenuIsOpen(false)
        else setSelectMenuIsOpen(true)
    }

    const handleOutSideMenuClick = (e: Event): void => {
        if ((selectRef.current && !e.composedPath().includes(selectRef.current)) && selectMenuIsOpen) {
            setSelectMenuIsOpen(false)
        }
    }

    const menuItemOnClickHandler = (menuItem: SelectMenuItemT): void => {
        setSelectedItem(menuItem)

        if ($closeAfterSelect) setSelectMenuIsOpen(false)
    }

    useEffect(() => {
        document.body.addEventListener('click', handleOutSideMenuClick)
        return () => {
            document.body.removeEventListener('click', handleOutSideMenuClick)
        }
    });

    // Set default menu item to the selectedItem
    useEffect((): void => {
        const defaultMenuItem = menuItems.filter((item: SelectMenuItemT) => item.default)[0]
        setSelectedItem(defaultMenuItem)
    }, []);

    useEffect((): void => {
        if (selectedItem?.value) {
            $newValueSetter(selectedItem.value)
        }
    }, [selectedItem]);

    return (
        <SelectContainer ref={selectRef}>
            <SelectBtnWrapper onClick={handleSelectBtn}>
                {hasIcon && <Icon iconSrc={selectedItem?.iconSrc || ''} width={'18rem'}/>}
                <span className={'selected-item-text'}>{selectedItem?.name}</span>
                <Icon iconSrc={'arrow-down-simple.svg'} width={'10rem'}/>
            </SelectBtnWrapper>

            {
                selectMenuIsOpen && <SelectMenuWrapper $menuXDirStartPosition={$menuXDirStartPosition}>
                    {
                        menuItems.map((item: SelectMenuItemT, i: number) => {
                            return (
                                <SelectMenuItem key={item.name + i}
                                                onClick={() => menuItemOnClickHandler(item)}
                                                $selected={item.name === selectedItem?.name}>
                                    {hasIcon && <Icon iconSrc={item.iconSrc} width={'20rem'}/>}
                                    {item.name}
                                </SelectMenuItem>
                            )
                        })
                    }
                </SelectMenuWrapper>
            }
        </SelectContainer>
    )
}