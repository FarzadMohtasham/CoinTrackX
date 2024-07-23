import { css, styled } from 'styled-components';

import { PaymentMethodOptionProps } from '@typings/PaymentMethodOption.type.ts';
import Icon from '@components/ui/stuff/Icon.tsx';

const PaymentMethodOptionContainer = styled.div<{ $disabled: boolean }>`
    box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
    padding: 16px;
    border-radius: 8px;
    cursor: pointer;
    position: relative;

    .wrapper {
        display: flex;
        align-items: center;
        gap: 10px;

        .info-wrapper {
            .title {
                font-size: var(--font-size-body-sm);
                font-weight: bold;
            }

            .description {
                font-size: var(--font-size-body-xsm);
                text-align: justify-all;
            }
        }
    }

    ${(props) =>
            props.$disabled &&
            css`
      &::after {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 8px;
        background-color: black;
        opacity: 0.1;
        cursor: not-allowed;
      }
    `}
`;

export default function PaymentMethodOptionComponent(props: PaymentMethodOptionProps) {
  const { title, description, onClick, iconSrc, disabled } = props;

  const onPaymentMethodOptionClick = () => {
    if (disabled || !onClick) return;
    onClick();
  };

  return (
    <PaymentMethodOptionContainer $disabled={disabled}>
      <div className="wrapper" onClick={onPaymentMethodOptionClick}>
        <Icon iconSrc={iconSrc} width={'58px'} />
        <div className={'info-wrapper'}>
          <span className={'title'}>{title}</span>
          <p className={'description'}>{description}</p>
        </div>
        <Icon
          iconSrc={'/icon-pack-1/arrows/solid/direction-right-01.svg'}
          width={'30px'}
        />
      </div>
    </PaymentMethodOptionContainer>
  );
}
