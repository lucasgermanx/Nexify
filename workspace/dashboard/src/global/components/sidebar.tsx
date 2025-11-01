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
    sidebar: { backgroundColor: "#FFFFFF", color: "#474747" },
    menu: {
      menuContent: "#262626",
      icon: "white",
      hover: { backgroundColor: "white", color: "#FF9A36" },
      disabled: { color: "#9fb6cf" },
    },
  },
  dark: {
    sidebar: { backgroundColor: "#0b2948", color: "#8ba1b7" },
    menu: {
      menuContent: "#082440",
      icon: "#59d0ff",
      hover: { backgroundColor: "#00458b", color: "#b6c8d9" },
      disabled: { color: "#3e5e7e" },
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
    font-weight: bold;
    color: ${(props) => (props.theme === 'light' ? '#474747' : '#fff')};
  }
`;

const MenuContainerBottom = styled.div`
  position: absolute;
  bottom: 100px;
  display: flex;
  align-items: center;
`;

interface SidebarContainerProps {
  rtl?: boolean;
}

const SidebarContainer = styled.div<SidebarContainerProps>`
  display: flex;
  height: 100vh;
  direction: ${(props) => (props.rtl ? 'rtl' : 'ltr')};
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
  const [theme, setTheme] = React.useState<Theme>("light");

  useEffect(() => {
    ProviderGetSelectedStore(store_reference);
  }, [stores]);

  const menuItemStyles: MenuItemStyles = {
    root: { fontSize: "15px", fontWeight: 700 },
    icon: { color: "white", [`&.${menuClasses.disabled}`]: { color: themes[theme].menu.disabled.color } },
    SubMenuExpandIcon: { color: "#b6b7b9" },
    subMenuContent: ({ level }) => ({
      backgroundColor: level === 0 ? hexToRgba(themes[theme].menu.menuContent, 1) : "transparent",
    }),
    button: {
      [`&.${menuClasses.disabled}`]: { color: themes[theme].menu.disabled.color },
      "&:hover": { backgroundColor: "transparent", color: themes[theme].menu.hover.color },
    },
    label: ({ open }) => ({ fontWeight: open ? 600 : undefined }),
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
        rootStyles={{ color: themes[theme].sidebar.color, height: "100vh" }}
      >
        <SidebarHeader rtl={false} style={{ marginBottom: "54px", marginTop: "16px" }} />
        <div style={{ flex: 1, marginBottom: "32px" }}>
          <Menu menuItemStyles={menuItemStyles}>
            <Link to="/">
              <MenuItem icon={<CiGrid41 fontSize={20} color="#474747" />}>
                Visão Geral
              </MenuItem>
            </Link>
            <Link to="/produtos">
              <MenuItem icon={<CiShoppingBasket fontSize={20} color="#474747" />}>
                Produtos
              </MenuItem>
            </Link>
            <Link to="/comandos">
              <MenuItem icon={<CiBoxes fontSize={20} color="#474747" />}>
                Comandos
              </MenuItem>
            </Link>
            <Link to="/cupons">
              <MenuItem icon={<CiDiscount1 fontSize={20} color="#474747" />}>
                Cupons
              </MenuItem>
            </Link>
            <Link to="/blog">
              <MenuItem icon={<CiViewTimeline fontSize={20} color="#474747" />}>
                Blog
              </MenuItem>
            </Link>
            <Link to="/transacoes">
              <MenuItem icon={<CiDollar fontSize={20} color="#474747" />}>
                Transações
              </MenuItem>
            </Link>
          </Menu>
        </div>

        <MenuContainerBottom theme={theme as any}>
          <Menu menuItemStyles={menuItemStyles}>
            <Link to="/settings">
              <MenuItem icon={<CiSettings fontSize={20} color="#474747" />}>
                Configurações
              </MenuItem>
            </Link>
            <a
              href={store?.store_domain ? `https://${store?.store_domain}` : `https://${store?.store_subdomain}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MenuItem icon={<CiShop fontSize={20} color="#474747" />}>
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
