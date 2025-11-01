"use client";

import { BiEnvelope, BiLock } from "react-icons/bi";

import { AuthLoginAction } from "@/core/client/actions/auth/login.actions";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import { Input } from "@nextui-org/input";
import Link from "next/link";
import NextLink from "next/link";
import React from "react";
import icon_white from "/public/icon_white.png"
import parse from "html-react-parser";

export default function Login() {
  const { addForm, dataForm, getErrorByType, HandlerLogin } = AuthLoginAction();

  return (
    <section className="h-screen flex flex-col lg:flex-row">
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

      <section className="h-screen w-full lg:w-1/2 bg-slate-900">
        <div className="container mx-auto pt-10 lg:pt-56 lg:w-1/2">
          <center>
            <Image
              src="/icon_orange.png"
              width="100"
              height="100"
              alt="dashboard"
            />
          </center>

          <h1 className="text-4xl text-white font-bold pt-10 text-center lg:text-left">
            Acessar minha conta
          </h1>
          <p className="text-white font-semibold text-center lg:text-left">
            O melhor você encontra aqui
          </p>

          <div className="pt-5 lg:pt-10">
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
                  getErrorByType("email")?.type === "email"
                    ? parse(`${getErrorByType("email")?.message}`)
                    : ""
                }
                isInvalid={
                  getErrorByType("email")?.type === "email"
                    ? getErrorByType("email")?.isInvalid
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
                  getErrorByType("password")?.type === "password"
                    ? parse(`${getErrorByType("password")?.message}`)
                    : ""
                }
                isInvalid={
                  getErrorByType("password")?.type === "password"
                    ? getErrorByType("password")?.isInvalid
                    : false
                }
              />
            </div>
          </div>

          <Button
            className="w-full mt-5 rounded-full p-5 h-12 bg-orange-500 text-white"
            isDisabled={
              dataForm.password?.length === 0 ||
              dataForm.email?.length === 0 ||
              getErrorByType("email")?.isInvalid ||
              getErrorByType("password")?.isInvalid
            }
            onPress={() => {
              HandlerLogin();
            }}
          >
            Acessar minha conta
          </Button>

          <NextLink href="/auth/recover">
          <p className="pt-5 text-sm text-center lg:text-left text-white hover:text-orange-400">
            Esqueci minha senha
          </p>
          </NextLink>

          <p className="text-sm text-white text-center lg:text-left pt-5">
            Ainda não é cadastrado?{" "}
            <span className="text-white hover:text-orange-400 font-bold">
              <Link href="/auth/register"> Crie sua conta agora </Link>
            </span>
          </p>
        </div>
      </section>
    </section>
  );
}

