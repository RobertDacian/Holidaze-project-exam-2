import styled from 'styled-components';

export const CheckboxDropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const DropdownToggle = styled.button`
  background-color: var(--secondary-color);
  color: var(--primary-color);
  border: none;
  padding: 12px;
  width: 100%;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: var(--transition-secondary-color);
  }
`;

export const DropdownMenu = styled.div`
  display: ${(props) => (props.show ? 'block' : 'none')};
  position: absolute;
  background-color: var(--white-color);
  width: 100%;
  min-width: 160px;
  box-shadow: var(--light-shadow);
  z-index: 1;
`;

export const DropdownItem = styled.div`
  padding: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: var(--transition-secondary-color);
    color: var(--primary-color);
  }
`;
