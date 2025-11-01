import React from 'react';
import { Tabs } from 'react-bootstrap';

interface MenuProps {
  children: React.ReactNode; // Aceita múltiplos children
}

export const MenuComponent = ({ children }: MenuProps) => {
  return (
    <Tabs defaultActiveKey="profile" id="justify-tab-example" className="mb-3" justify>
      {children}
    </Tabs>
  );
};
