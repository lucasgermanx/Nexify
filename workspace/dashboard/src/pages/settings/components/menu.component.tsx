import React from 'react';
import { Tabs } from 'react-bootstrap';
import styled from 'styled-components';

const StyledTabs = styled(Tabs)`
  .nav-tabs {
    border-bottom: 2px solid rgba(255, 255, 255, 0.05);
    margin-bottom: 32px;
    gap: 8px;

    .nav-link {
      color: rgba(255, 255, 255, 0.6) !important;
      background-color: transparent !important;
      border: none !important;
      border-bottom: 3px solid transparent !important;
      padding: 14px 24px !important;
      font-weight: 500 !important;
      font-size: 0.95rem !important;
      transition: all 0.3s ease !important;
      margin-right: 0;
      border-radius: 8px 8px 0 0;
      position: relative;

      &:hover {
        color: rgba(255, 255, 255, 0.9) !important;
        background-color: rgba(255, 255, 255, 0.02) !important;
        border-bottom-color: rgba(255, 140, 0, 0.3) !important;
      }

      &.active {
        color: #ff8c00 !important;
        background-color: rgba(255, 140, 0, 0.05) !important;
        border-bottom: 3px solid #ff8c00 !important;
        font-weight: 600 !important;
      }
    }
  }

  .tab-content {
    color: rgba(255, 255, 255, 0.9);
    padding-top: 8px;
  }
`;

interface MenuProps {
  children: React.ReactNode;
}

export const MenuComponent = ({ children }: MenuProps) => {
  return (
    <StyledTabs defaultActiveKey="profile" id="justify-tab-example" className="mb-3" justify>
      {children}
    </StyledTabs>
  );
};
