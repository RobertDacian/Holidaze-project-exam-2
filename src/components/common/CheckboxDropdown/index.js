// src/components/common/CheckboxDropdown/index.js
import React, { useState, useEffect, useRef } from 'react';
import {
  CheckboxDropdownContainer,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from './CheckboxDropdown.styles';

const CheckboxDropdown = ({ options, label, onChange }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Cleanup the event listener on component unmount
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    setShowDropdown((prevShowDropdown) => !prevShowDropdown);
  };

  const handleOptionClick = (event, option) => {
    event.stopPropagation();
    onChange(option);
  };

  return (
    <CheckboxDropdownContainer ref={dropdownRef}>
      <DropdownToggle onClick={handleToggle}>{label}</DropdownToggle>
      <DropdownMenu show={showDropdown}>
        {options.map((option, index) => (
          <DropdownItem
            key={index}
            onClick={(event) => event.stopPropagation()}
          >
            <input
              type='checkbox'
              checked={option.checked}
              onChange={(event) => handleOptionClick(event, option)}
            />
            {option.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </CheckboxDropdownContainer>
  );
};

export default CheckboxDropdown;
