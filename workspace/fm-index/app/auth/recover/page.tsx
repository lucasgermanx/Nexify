"use client";

import { BiEnvelope } from "react-icons/bi";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import { Input } from "@nextui-org/input";
import Link from "next/link";
import React from "react";
import { RecoverAccountActions } from "@/core/client/actions/auth/recover-account.actions";
import parse from "html-react-parser";

export default function Recover() {
  const { addForm, dataForm, getErrorByType, HandlerRecover } =
    RecoverAccountActions();

  return (
    <section>
      <div className="flex bg-slate-900 h-screen">
        <div className="m-auto rounded-lg" style={{ padding: "5%" }}>
          <div className="container mx-auto">
            <center>
              <Image
                src="/icon_orange.png"
                width="100"
                height="100"
                alt="dashboard"
              />
            </center>

            <h1 className="text-4xl text-white font-bold pt-10 text-center">
              Recuperar minha conta
            </h1>
            <p className="text-base font-semibold text-white text-center">
              Recupere sua conta para aproveitar todos os benefícios
            </p>

            <div className="pb-2">
              <div className="w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                <div
                  id="otp"
                  className="flex flex-row justify-center text-center px-2 mt-5"
                >
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
                </div>
              </div>
            </div>

            <Link href="/auth/login">
              <p className="pt-5 text-sm text-center text-white hover:text-orange-400">
                Voltar
              </p>
            </Link>
          
            <Button
              className="w-full mt-5 rounded-full p-5 h-12 bg-orange-500 text-white"
              isDisabled={
                dataForm.email?.length === 0 ||
                getErrorByType("email")?.isInvalid
              }
              onPress={() => {
                HandlerRecover();
              }}
            >
              Recuperar minha conta
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
