"use client";

import { AlterPasswordAction } from "@/core/client/actions/auth/recover-account.actions";
import { BiLock } from "react-icons/bi";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import { Input } from "@nextui-org/input";
import React from "react";
import parse from "html-react-parser";

export default function Login() {
  const {addForm, dataForm, getErrorByType, handlerResetPassword} = AlterPasswordAction();

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
              Alterar minha senha
            </h1>

            <div className="pt-5" style={{ paddingTop: "6%" }}>
              <div className="w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
              <Input
                  label="Password"
                  placeholder="*********"
                  startContent={<BiLock />}
                  variant="bordered"
                  className="pt-5 text-white"
                  onChange={(e) => {
                    addForm("password", e.target.value);
                  }}
                  type="password"
                  errorMessage={
                    getErrorByType("password")?.type == "password" ? (
                      parse(`${getErrorByType("password")?.message}`)
                    ): ""
                  }
                  isInvalid={
                    getErrorByType("password")?.type == "password" ? (
                      getErrorByType("password")?.isInvalid
                    ) : false
                  }
                />

                <Input
                  label="Password"
                  placeholder="*********"
                  startContent={<BiLock />}
                  variant="bordered"
                  className="pt-5 text-white"
                  onChange={(e) => {
                    addForm("confirm_password", e.target.value);
                  }}
                  type="password"
                  errorMessage={
                    getErrorByType("confirm_password")?.type == "confirm_password" ? (
                      parse(`${getErrorByType("confirm_password")?.message}`)
                    ): ""
                  }
                  isInvalid={
                    getErrorByType("confirm_password")?.type == "confirm_password" ? (
                      getErrorByType("confirm_password")?.isInvalid
                    ) : false
                  }
                />
              </div>
            
            </div>

                
            {dataForm.password != dataForm.confirm_password ? (<p className="text-danger text-sm pt-3 pb-4 font-semibold flex">As senhas precisam ser iguais</p>) : ""}

            <Button
              className="w-full mt-5 rounded-full p-5 h-12 text-white bg-orange-400"
              onPress={()=>{handlerResetPassword()}}
              isDisabled={
                dataForm.password?.length === 0 ||
                dataForm.confirm_password?.length === 0 ||
                getErrorByType('confirm_password')?.isInvalid ||
                getErrorByType('password')?.isInvalid ||
                dataForm.password != dataForm.confirm_password
              }
              
            >
              Alterar minha senha
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
