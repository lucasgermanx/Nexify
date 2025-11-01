"use client";

import { Button } from "@nextui-org/button";
import { ConfirmTokenAccountActions } from "@/core/client/actions/auth/recover-account.actions";
import Image from "next/image";
import { OTPInput } from "@/components/shared/OTPInput";
import React from "react";

export default function Activate() {
  const { HandlerOTP, setOTP, otp, ResendToken } = ConfirmTokenAccountActions();

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
                  <OTPInput setOTP={setOTP} otp={otp} />
                </div>
              </div>
            </div>

            <Button
              className="w-full mt-5 rounded-full p-5 h-12 text-white bg-orange-400"
              isDisabled={otp?.length < 6 ? true : false}
              onPress={() => {
                HandlerOTP();
              }}
            >
              Recuperar minha conta
            </Button>

            <center>
              <Button variant="light" className="hover:bg-transparent text-white" onPress={()=>{ResendToken()}}>
                Reenviar codigo
              </Button>
            </center>
          </div>
        </div>
      </div>
    </section>
  );
}
