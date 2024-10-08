import { JSX, Ref, useEffect, useRef, useState } from 'react';
import { css, styled } from 'styled-components';

import Icon from '@components/ui/stuff/Icon.tsx';

import {
   SelectedMenuItemProps,
   SelectMenuItem as SelectMenuItemT,
   SelectMenuWrapperProps,
   SelectProps,
} from '@typings/components/Select.type.ts';
import { AnimatePresence, motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';

const SelectContainer = styled.div<{ ref: Ref<HTMLElement | null> }>`
   display: block;
   position: relative;

   span.label {
      display: block;
      margin-bottom: 8px;
      color: var(--color-black);
      font-size: var(--font-size-body-md);
   }
`;

const SelectBtnWrapper = styled.div`
   display: flex;
   align-items: center;
   gap: 11px;
   padding: 8px 16px;
   border: 2px solid var(--color-black-100);
   border-radius: 8px;
   cursor: pointer;

   .selected-item-text {
      text-transform: uppercase;
      font-weight: 500;
      font-size: var(--font-size-body-sm);
   }
`;

const SelectMenuWrapper = styled.ul<SelectMenuWrapperProps>`
   list-style: none;
   background-color: #2f343e;
   padding: 10px;
   display: flex;
   flex-direction: column;
   gap: 10px;
   position: absolute;
   ${(props: any): string =>
      props.$menuXDirStartPosition === 'right' ? 'right: 0' : 'left: 0'};
   top: 50px;
   border-radius: 8px;
   z-index: 10;
   height: min-content;
   max-height: 200px;
   overflow: hidden;

   ul.menu-items-wrapper {
      overflow-y: scroll;
      padding-right: 5px;

      &::-webkit-scrollbar-track {
         background-color: #2f343e;
      }

      &::-webkit-scrollbar-thumb {
         background-color: var(--color-white-300);
      }

      li {
         padding: 8px 100px 8px 10px;
         color: white;
         cursor: pointer;
         font-weight: 400;
         font-size: var(--font-size-body-sm);
         min-width: max-content;
      }
   }
`;

const SelectMenuItem = styled.li<SelectedMenuItemProps>`
   display: flex;
   gap: 10px;
   text-transform: uppercase;
   border-radius: 6px;
   transition: background-color 0.3s ease-in-out;

   .menu-arrow-icon {
   }

   ${(props: any) =>
      props.$selected &&
      css`
         background-color: #22242a;
      `};

   ${(props: any) =>
      !props.$selected &&
      css`
         &:hover {
            background-color: var(--color-white-50);
         }
      `}
`;

export default function Select(props: SelectProps): JSX.Element {
   const {
      items,
      itemSelectSetter,
      defaultSelectedItem = null,
      hasIcon: hasIcon = false,
      closeAfterSelect = true,
      menuXDirStartPosition = 'right',
      label = null,
   } = props;

   const [selectedItem, setSelectedItem] = useState<null | SelectMenuItemT>(
      defaultSelectedItem,
   );
   const [selectMenuIsOpen, setSelectMenuIsOpen] = useState<boolean>(false);
   const selectRef = useRef<HTMLElement | null>(null);

   const handleSelectBtn = (): void => {
      if (selectMenuIsOpen) setSelectMenuIsOpen(false);
      else setSelectMenuIsOpen(true);
   };

   const handleOutSideMenuClick = (e: Event): void => {
      if (
         selectRef.current &&
         !e.composedPath().includes(selectRef.current) &&
         selectMenuIsOpen
      ) {
         setSelectMenuIsOpen(false);
      }
   };

   const menuItemOnClickHandler = (menuItem: SelectMenuItemT): void => {
      setSelectedItem(menuItem);

      if (closeAfterSelect) setSelectMenuIsOpen(false);
   };

   useEffect(() => {
      document.body.addEventListener('click', handleOutSideMenuClick);
      return () => {
         document.body.removeEventListener('click', handleOutSideMenuClick);
      };
   });

   // Set default menu item to the selectedItem
   useEffect((): void => {
      const defaultMenuItem = items.filter(
         (item: SelectMenuItemT) => item.default,
      )[0];
      setSelectedItem(defaultMenuItem);
   }, []);

   useEffect((): void => {
      if (selectedItem?.value) {
         itemSelectSetter(selectedItem.value);
      }
   }, [selectedItem]);

   useEffect(() => {
      if (defaultSelectedItem && selectedItem === undefined)
         setSelectedItem(defaultSelectedItem);
   }, [defaultSelectedItem]);

   return (
      <SelectContainer ref={selectRef}>
         {label && <span className="label">{label}</span>}
         <SelectBtnWrapper onClick={handleSelectBtn}>
            {hasIcon && (
               <Icon iconSrc={selectedItem?.iconSrc || ''} width={'18px'} />
            )}
            <span className={'selected-item-text'}>{selectedItem?.name}</span>
            <Icon
               as={motion.img}
               animate={{ rotate: selectMenuIsOpen ? '180deg' : '0' }}
               iconSrc={'arrow-down-simple.svg'}
               width={'10px'}
            />
         </SelectBtnWrapper>

         <AnimatePresence>
            {selectMenuIsOpen && (
               <SelectMenuWrapper
                  as={motion.div}
                  $menuXDirStartPosition={menuXDirStartPosition}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key={'select-anime' + uuidv4()}
               >
                  <ul className="menu-items-wrapper">
                     {items.map((item: SelectMenuItemT, i: number) => {
                        return (
                           <SelectMenuItem
                              key={item.name + i}
                              onClick={() => menuItemOnClickHandler(item)}
                              $selected={item.name === selectedItem?.name}
                           >
                              {hasIcon && (
                                 <Icon
                                    iconSrc={item.iconSrc}
                                    className="menu-arrow-icon"
                                    width={'20px'}
                                 />
                              )}
                              {item.name}
                           </SelectMenuItem>
                        );
                     })}
                  </ul>
               </SelectMenuWrapper>
            )}
         </AnimatePresence>
      </SelectContainer>
   );
}
