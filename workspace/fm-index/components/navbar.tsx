"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle
} from "@nextui-org/navbar";
import { useEffect, useState } from "react";

import { siteConfig } from "@/config/site";
import { useAuth } from "@/core/client/providers/auth.provider";
import { Button } from "@nextui-org/button";
import { link as linkStyles } from "@nextui-org/theme";
import clsx from "clsx";
import Image from "next/image";
import NextLink from "next/link";

export const NavbarComponent = () => {
  const { user, ProviderGetUser } = useAuth();

  useEffect(() => {
    ProviderGetUser();
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <a href="https://razehost.com.br/" target="_blank">
        <div className="w-full h-10 bg-orange-400 flex items-center justify-center">
          <p className="text-center text-white text-sm font-semibold">VPS Gamer com proteção DDoS a partir de R$39,90</p>
        </div>
      </a>
      <Navbar shouldHideOnScroll position="static" onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Image src="/icon_orange.png" alt="logo" height="40" width="40" />
            <p className="font-semibold text-inherit">FiveMarket</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex " justify="center">
        {siteConfig.navItems.map((item) => (
          <NavbarItem key={item.href}>
            <NextLink
              className={clsx(
                linkStyles({ color: "foreground" }),
                "data-[active=true]:text-primary data-[active=true]:font-medium text-sm"
              )}
              color="foreground"
              href={item.href}
            >
              {item.label}
            </NextLink>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          {!user ? (
            <>
              <NextLink href="/auth/login" className="pt-3 text-sm pr-3">
                Área do cliente
              </NextLink>
              <NextLink href="/auth/register">
                <Button className="text-sm font-normal bg-orange-400 text-white">
                  Começar agora
                </Button>
              </NextLink>
            </>
          ) : (
            <NextLink href="https://app.fivemarket.com.br/" passHref={true}>
              <Button className="text-sm font-normal bg-orange-400 text-white">
                Acessar painel
              </Button>
            </NextLink>
          )}
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {siteConfig.navItems.map((item) => (
          <NavbarItem key={item.href}>
            <NextLink
              className={clsx(
                linkStyles({ color: "foreground" }),
                "data-[active=true]:text-primary data-[active=true]:font-medium text-sm"
              )}
              color="foreground"
              href={item.href}
            >
              {item.label}
            </NextLink>
          </NavbarItem>
        ))}
        <NavbarItem>
          {!user ? (
            <>
              <NextLink href="/auth/login" className="pt-3 text-sm pr-3">
                Área do cliente
              </NextLink>
              <NextLink href="/auth/register">
                <Button className="text-sm font-normal bg-orange-400 text-white">
                  Começar agora
                </Button>
              </NextLink>
            </>
          ) : (
            <NextLink href="https://app.fivemarket.com.br/" passHref={true}>
              <Button className="text-sm font-normal bg-orange-400 text-white">
                Acessar painel
              </Button>
            </NextLink>
          )}
        </NavbarItem>
      </NavbarMenu>
    </Navbar>
    </>
  );
};
