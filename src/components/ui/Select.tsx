import {Dispatch, Ref, SetStateAction, useEffect, useRef, useState} from "react";
import {css, styled} from "styled-components";

import Icon from "@components/ui/Icon.tsx";

import {SelectProps, SelectMenuItem as SelectMenuItemT, SelectedMenuItemProps} from "@ts/type/Select.type.ts";

const SelectContainer = styled.div<{ ref: Ref<HTMLElement | null> }>`
  width: min-content;
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

  span {
    text-transform: uppercase;
    color: black;
    font-weight: 500;
    font-size: var(--font-size-body-sm);
  }
`

const SelectMenuWrapper = styled.ul`
  list-style: none;
  background-color: #2f343e;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: absolute;
  left: 0;
  top: 5rem;
  border-radius: .8rem;

  li {
    padding: .8rem 10rem .8rem 1rem;
    color: white;
    cursor: pointer;
    font-weight: 400;
    font-size: var(--font-size-body-sm);
  }
`

const SelectMenuItem = styled.li<SelectedMenuItemProps>`
  display: flex;
  gap: 1rem;
  text-transform: uppercase;
  border-radius: .6rem;
  transition: background-color .3s ease-in-out;
  ${props => props.$selected && css`background-color: #22242a`};
  
  ${
    props => !props.$selected && css`
      &:hover {
        background-color: var(--color-white-50);
      }
    `
  }
`

export default function Select(props: SelectProps) {
    const {
        $menu_items: menu_items,
        $has_icon: has_icon = false
    } = props

    const [selectedItem, setSelectedItem]: [selectedItem: SelectMenuItemT | null, setSelectedItem: Dispatch<SetStateAction<null | SelectMenuItemT>>] = useState<null | SelectMenuItemT>(null)
    const selectRef = useRef<HTMLElement | null>(null);
    const [selectMenuIsOpen, setSelectMenuIsOpen] = useState<boolean>(false)

    const handleSelectBtn = () => {
        if (selectMenuIsOpen) setSelectMenuIsOpen(false)
        else setSelectMenuIsOpen(true)
    }

    const handleOutSideMenuClick = (e: Event) => {
        if ((selectRef.current && !e.composedPath().includes(selectRef.current)) && selectMenuIsOpen) {
            setSelectMenuIsOpen(false)
        }
    }

    useEffect(() => {
        document.body.addEventListener('click', handleOutSideMenuClick)
        return () => {
            document.body.removeEventListener('click', handleOutSideMenuClick)
        }
    });

    const menuItemOnClickHandler = (menuItem: SelectMenuItemT) => {
        setSelectedItem(menuItem)
    }

    // Set default menu item to the selectedItem
    useEffect(() => {
        const defaultMenuItem = menu_items.filter(item => item.default)[0]
        setSelectedItem(defaultMenuItem)
    }, []);

    return (
        <SelectContainer ref={selectRef}>
            <SelectBtnWrapper onClick={handleSelectBtn}>
                {has_icon && <Icon icon_src={selectedItem?.icon_src || ''} width={'16rem'}/>}
                <span>{selectedItem?.name}</span>
                <Icon icon_src={'arrow-down-simple.svg'} width={'10rem'}/>
            </SelectBtnWrapper>

            {
                selectMenuIsOpen && <SelectMenuWrapper>
                    {
                        menu_items.map((item, i) => {
                            return (
                                <SelectMenuItem key={item.name + i}
                                                onClick={() => menuItemOnClickHandler(item)}
                                                $selected={item.name === selectedItem?.name}>
                                    {has_icon && <Icon icon_src={item.icon_src} width={'16rem'}/>}
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