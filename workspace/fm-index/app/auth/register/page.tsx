'use client'

import { BiEnvelope, BiLock, BiLogoDiscord, BiUser, BiUserCircle } from "react-icons/bi";

import { AuthRegisterAction } from "@/core/client/actions/auth/register.actions";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import { Input } from "@nextui-org/input";
import Link from "next/link";
import React from "react";
import icon_white from "/public/icon_white.png";
import parse from "html-react-parser";
import { useMask } from '@react-input/mask';

export default function Register() {
  const { addForm, dataForm, getErrorByType, HandlerRegister } =
    AuthRegisterAction();
    const inputRef = useMask({ mask: '___.___.___-__', replacement: { _: /\d/ } });

  return (
    <section className="h-screen flex">
      <section className="h-screen w-full lg:w-1/2 bg-slate-900">
        <div className="container mx-auto pt-36 w-1/2">
          <center>
            <Image
              src="/icon_orange.png"
              width="100"
              height="100"
              alt="dashboard"
            />
          </center>

          <h1 className="text-4xl text-white font-bold pt-10 text-center">
            Criar minha conta
          </h1>
          <p className="text-white font-semibold text-center">
            O melhor voce encontra Aqui
          </p>

          <div className="pt-5">
            <div className="gap-4">
              <Input
                type="text"
                label="Nome completo"
                placeholder="Nome completo"
                startContent={<BiUser color="white" />}
                variant="bordered"
                className="text-white"
                onChange={(e) => {
                  addForm("name", e.target.value);
                }}
                errorMessage={
                  getErrorByType("name")?.type == "name"
                    ? parse(`${getErrorByType("name")?.message}`)
                    : ""
                }
                isInvalid={
                  getErrorByType("name")?.type == "name"
                    ? getErrorByType("name")?.isInvalid
                    : false
                }
              />
            </div>
            <div className="gap-4">
              <Input
                type="email"
                label="Email"
                placeholder="you@example.com"
                startContent={<BiEnvelope color="white" />}
                variant="bordered"
                className="pt-5 text-white"
                onChange={(e) => {
                  addForm("email", e.target.value);
                }}
                errorMessage={
                  getErrorByType("email")?.type == "email"
                    ? parse(`${getErrorByType("email")?.message}`)
                    : ""
                }
                isInvalid={
                  getErrorByType("email")?.type == "email"
                    ? getErrorByType("email")?.isInvalid
                    : false
                }
              />

              <Input
                label="CPF"
                placeholder="000.000.000-00"
                ref={inputRef}
                startContent={<BiUserCircle color="white" />}
                variant="bordered"
                className="pt-5 text-white"
                onChange={(e) => {
                  addForm("cpf", e.target.value);
                }}
                type="text"
                errorMessage={
                  getErrorByType("cpf")?.type == "cpf"
                    ? parse(`${getErrorByType("cpf")?.message}`)
                    : ""
                }
                isInvalid={
                  getErrorByType("cpf")?.type == "cpf"
                    ? getErrorByType("cpf")?.isInvalid
                    : false
                }
              />
              
              <Input
                label="Discord"
                placeholder="ID do seu usuário do discord"
                startContent={<BiLogoDiscord color="white" />}
                variant="bordered"
                className="pt-5 text-white"
                onChange={(e) => {
                  addForm("user_discord", e.target.value);
                }}
                type="number"
                maxLength={18}
                errorMessage={
                  getErrorByType("user_discord")?.type == "user_discord"
                    ? parse(`${getErrorByType("user_discord")?.message}`)
                    : ""
                }
                isInvalid={
                  getErrorByType("user_discord")?.type == "user_discord"
                    ? getErrorByType("user_discord")?.isInvalid
                    : false
                }
              />
            

              <Input
                label="Password"
                placeholder="*********"
                startContent={<BiLock color="white" />}
                variant="bordered"
                className="pt-5 text-white"
                onChange={(e) => {
                  addForm("password", e.target.value);
                }}
                type="password"
                errorMessage={
                  getErrorByType("password")?.type == "password"
                    ? parse(`${getErrorByType("password")?.message}`)
                    : ""
                }
                isInvalid={
                  getErrorByType("password")?.type == "password"
                    ? getErrorByType("password")?.isInvalid
                    : false
                }
              />
            </div>
          </div>

          <Button
            className="w-full mt-5 rounded-full p-5 h-12 bg-orange-500 text-white"
            isDisabled={
              dataForm.name?.length === 0 ||
              dataForm.password?.length === 0 ||
              dataForm.email?.length === 0 ||
              dataForm.cpf?.length === 0 ||
              getErrorByType("cpf")?.isInvalid ||
              getErrorByType("name")?.isInvalid ||
              getErrorByType("user_discord")?.isInvalid ||
              getErrorByType("email")?.isInvalid ||
              getErrorByType("password")?.isInvalid
            }
            onPress={() => {
              HandlerRegister();
            }}
          >
            Criar minha conta
          </Button>

          <p className="text-sm text-white text-center pt-5">
            Já é cadastrado?{" "}
            <span className="text-white hover:text-orange-400 font-bold">
              <Link href="/auth/login"> Acesse sua conta agora </Link>
            </span>
          </p>
        </div>
      </section>
      <section className="hidden lg:flex h-1/2 lg:h-full w-1/2 bg-orange-400 flex flex-col justify-end">
        <div className="p-8 lg:p-16">
          <div className="text-center lg:text-left">
            <Image
              src={icon_white}
              alt="logo_white"
              className="w-48 lg:w-64 mx-auto lg:mx-0"
            />
            <p className="text-white font-semibold mt-4 lg:mt-8">
              Comece a ganhar dinheiro com seu servidor online agora mesmo com a <br />
              FiveMarket!
            </p>
          </div>
        </div>
      </section>
    </section>
  );
}
