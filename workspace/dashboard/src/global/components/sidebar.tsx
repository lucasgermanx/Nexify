"use client";
import { useAuth } from "@/core/client/providers/auth/auth.provider";
import { Menu, MenuItem, MenuItemStyles, Sidebar, menuClasses } from "@ascendtis/react-pro-sidebar";
import React, { useEffect } from "react";
import { CiBoxes, CiDiscount1, CiDollar, CiGrid41, CiSettings, CiShop, CiShoppingBasket, CiViewTimeline } from "react-icons/ci";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { SidebarHeader } from "./sidebar/SidebarHeader";
import { useStore } from "@/core/client/providers/store/store.provider";
import { useManageStore } from "@/core/client/hooks/select-store-zuustand";

type Theme = "light" | "dark";

const themes = {
  light: {
    sidebar: { backgroundColor: "#121212", color: "#ffffff" },
    menu: {
      menuContent: "#121212",
      icon: "#ffffff",
      hover: { backgroundColor: "rgba(255, 255, 255, 0.05)", color: "#ff8c00" },
      disabled: { color: "rgba(255, 255, 255, 0.3)" },
    },
  },
  dark: {
    sidebar: { backgroundColor: "#121212", color: "#ffffff" },
    menu: {
      menuContent: "#121212",
      icon: "#ffffff",
      hover: { backgroundColor: "rgba(255, 255, 255, 0.05)", color: "#ff8c00" },
      disabled: { color: "rgba(255, 255, 255, 0.3)" },
    },
  },
};

const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

type ThemeType = 'light' | 'dark';

interface AvatarContainerProps {
  theme: ThemeType;
}

const AvatarContainer = styled.div<AvatarContainerProps>`
  position: absolute;
  bottom: 20px;

  .avatar-circle {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;
  }

  .user-name {
    padding-top: 5px;
    font-size: 14px;
    font-weight: 600;
    color: #ffffff;
  }
`;

const MenuContainerBottom = styled.div`
  position: absolute;
  bottom: 100px;
  display: flex;
  align-items: center;
  padding-left: 8px;
  padding-right: 8px;
`;

interface SidebarContainerProps {
  rtl?: boolean;
}

const SidebarContainer = styled.div<SidebarContainerProps>`
  display: flex;
  height: 100vh;
  direction: ${(props) => (props.rtl ? 'rtl' : 'ltr')};
  overflow: visible;
  
  @media (min-width: 769px) {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
  }
  
  /* Garantir que o conteúdo do sidebar não seja cortado */
  .pro-sidebar {
    overflow: visible !important;
  }
  
  .pro-sidebar-inner {
    overflow: visible !important;
  }
`;

export default SidebarContainer;

export const SidebarComponent = () => {
  const { user } = useAuth();
  const { store, stores, ProviderGetSelectedStore } = useStore();
  const { store_reference } = useManageStore();
  const [collapsed, setCollapsed] = React.useState(false);
  const [toggled, setToggled] = React.useState(false);
  const [broken, setBroken] = React.useState(false);
  const [rtl, setRtl] = React.useState(false);
  const [theme, setTheme] = React.useState<Theme>("dark");

  // Expor collapsed para ajustar o ContainerWrapper se necessário
  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--sidebar-width', collapsed ? '80px' : '280px');
  }, [collapsed]);

  useEffect(() => {
    ProviderGetSelectedStore(store_reference);
  }, [stores]);

  const menuItemStyles: MenuItemStyles = {
    root: { fontSize: "15px", fontWeight: 500, color: "#ffffff" },
    icon: { color: "#ffffff", [`&.${menuClasses.disabled}`]: { color: themes[theme].menu.disabled.color } },
    SubMenuExpandIcon: { color: "rgba(255, 255, 255, 0.5)" },
    subMenuContent: ({ level }) => ({
      backgroundColor: level === 0 ? hexToRgba(themes[theme].menu.menuContent, 1) : "transparent",
    }),
    button: {
      color: "#ffffff",
      [`&.${menuClasses.disabled}`]: { color: themes[theme].menu.disabled.color },
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        color: "#ff8c00",
        borderRadius: "8px",
      },
      "&.ps-active": {
        backgroundColor: "rgba(255, 255, 255, 0.08)",
        color: "#ff8c00",
        borderRadius: "8px",
      },
    },
    label: ({ open }) => ({
      fontWeight: open ? 600 : 500,
      color: "#ffffff",
    }),
  };

  return (
    <SidebarContainer rtl={rtl}>
      <Sidebar
        collapsed={collapsed}
        toggled={toggled}
        onBackdropClick={() => setToggled(false)}
        onBreakPoint={setBroken}
        breakPoint="md"
        backgroundColor={hexToRgba(themes[theme].sidebar.backgroundColor, 1)}
        rootStyles={{
          color: themes[theme].sidebar.color,
          height: "100vh",
          borderRight: "1px solid rgba(255, 255, 255, 0.05)",
          overflow: "visible"
        }}
      >
        <SidebarHeader rtl={false} style={{ marginBottom: "54px", marginTop: "16px", paddingLeft: "20px", paddingRight: "20px" }} />
        <div style={{ flex: 1, marginBottom: "32px" }}>
          <Menu menuItemStyles={menuItemStyles}>
            <Link to="/">
              <MenuItem icon={<CiGrid41 fontSize={20} color="#ffffff" />}>
                Visão Geral
              </MenuItem>
            </Link>
            <Link to="/produtos">
              <MenuItem icon={<CiShoppingBasket fontSize={20} color="#ffffff" />}>
                Produtos
              </MenuItem>
            </Link>
            <Link to="/comandos">
              <MenuItem icon={<CiBoxes fontSize={20} color="#ffffff" />}>
                Comandos
              </MenuItem>
            </Link>
            <Link to="/cupons">
              <MenuItem icon={<CiDiscount1 fontSize={20} color="#ffffff" />}>
                Cupons
              </MenuItem>
            </Link>
            <Link to="/blog">
              <MenuItem icon={<CiViewTimeline fontSize={20} color="#ffffff" />}>
                Blog
              </MenuItem>
            </Link>
            <Link to="/transacoes">
              <MenuItem icon={<CiDollar fontSize={20} color="#ffffff" />}>
                Transações
              </MenuItem>
            </Link>
          </Menu>
        </div>

        <MenuContainerBottom theme={theme as any}>
          <Menu menuItemStyles={menuItemStyles}>
            <Link to="/settings">
              <MenuItem icon={<CiSettings fontSize={20} color="#ffffff" />}>
                Configurações
              </MenuItem>
            </Link>
            <a
              href={store?.store_domain ? `https://${store?.store_domain}` : `https://${store?.store_subdomain}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MenuItem icon={<CiShop fontSize={20} color="#ffffff" />}>
                Visualizar minha loja
              </MenuItem>
            </a>

          </Menu>
        </MenuContainerBottom>

        <AvatarContainer theme={theme as any}>
          <Menu menuItemStyles={menuItemStyles}>
            <MenuItem>
              <div className="d-flex">
                <div className="avatar-circle">
                  <img
                    src={`https://ui-avatars.com/api/name=${user?.name}?background=ff9a36&color=fff`}
                    alt="icon avatar"
                    width="100%"
                    height="100%"
                  />
                </div>
                <div>
                  <p className="user-name">{user?.name}</p>
                </div>
              </div>
            </MenuItem>
          </Menu>
        </AvatarContainer>
      </Sidebar>
    </SidebarContainer>
  );
};
