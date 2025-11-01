import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaTwitch,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import fm_icon from "../public/fm_icon.png"
const sections = [
  {
    title: "FiveMarket",
    items: [
      { name: "Documentação", link: "/documentacao" }, 
      { name: "Hospedagem FiveM", link: "/hospedagem" }, 
      { name: "Discord", link: "/discord" }, 
    ],
  },
  {
    title: "Suporte",
    items: [
      { name: "Discord", link: "/discord" }, 
      { name: "Chat", link: "/chat" }, 
    ],
  },
  {
    title: "Empresa",
    items: [
      { name: "Sobre nós", link: "/sobre-nos" }, 
      { name: "Blog", link: "/blog" }, 
    ],
  },
  {
    title: "Legal",
    items: [
      { name: "Termos e Condições", link: "/termos" }, 
      { name: "Privacidade", link: "/privacidade" }, 
      { name: "Uso de Cookies", link: "/cookies" }, 
    ],
  },
];

const items = [
  { name: "Facebook", icon: FaFacebook, link: "https://www.facebook.com/fivemarketbrasil" },
  { name: "Instagram", icon: FaInstagram, link: "https://www.instagram.com/fivemarketbrasil/" },
  { name: "Twitter", icon: FaTwitter, link: " https://twitter.com/fivemarketbr" },
  { name: "Youtube", icon: FaYoutube, link: "https://www.youtube.com/@fivemarketbrasil" },
];

const Footer = () => {
  return (
    <div
      className="w-full mt-24 text-white py-y px-2 bg-slate-900"
    >
      <div className="max-w-[1240px] mx-auto grid grid-cols-2 md:grid-cols-6 border-b border-gray-300 py-8">
        <div className="col-span-2 pt-8 md:pt-2">
          <div className="flex justify-start items-center gap-1">
            <Image src={fm_icon} alt="logo" />
          </div>
        </div>
      </div>

      <div className="flex flex-col max-w-[1240px] px-2 py-4 mx-auto justify-between sm:flex-row text-center texte-white">
        <p className="py-4">2024 FiveMarket, E-commerce. Todos os direitos reservados</p>
        <div className="flex justify-between sm:w-[300px] pt-4 text-2xl">
          {items.map((x, index) => {
            return <Link href={x.link}><x.icon key={index} className="hover:text-orange-400" /></Link>;
          })}
        </div>
      </div>
    </div>
  );
};

export default Footer;
