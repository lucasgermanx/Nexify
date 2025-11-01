"use client";

import {
  BiCheck,
  BiCheckCircle,
  BiLock,
  BiShareAlt,
  BiShow,
} from "react-icons/bi";

import { Button } from "@nextui-org/button";
import { HeaderCheckout } from "@/components/header-checkout.component";
import Link from "next/link";
import secureLocalStorage from "react-secure-storage";

export default function Company() {
  return (
    <>
      <HeaderCheckout />
      <div className="pt-16">
        <h2 className="text-4xl font-bold text-center">
          Loja criada com sucesso
        </h2>
        <p className="text-base text-slate-400 pt-2 text-center">
          Configure o novo site do seu servidor
        </p>
      </div>
      <div className="pt-16">
        <div className="container mx-auto max-w-7xl px-6 flex-grow pb-5">
          <div className="flex justify-between">
            <h4 className="font-display font-bold tracking-tight text-slate-900">
              Selecionar Plano
            </h4>
            <h4 className="font-display font-bold tracking-tight text-slate-900">
              Dados da sua loja
            </h4>
            <h4 className="font-display font-bold tracking-tight text-orange-400">
              Integração & Conclusão
            </h4>
          </div>
        </div>
        <hr />
      </div>
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
        <div className="flex justify-center">
          <section className="w-1/2 bg-orange-400 h-96 rounded-l-lg">
            <div className="pt-16">
              <center>
                <BiCheckCircle color="white" size={100} />
              </center>
              <h1 className="text-center font-display text-2xl font-bold tracking-tight text-white">
                Loja criada com sucesso!
              </h1>
              <p className="text-center text-white">
                Agora é prosseguir para o dashboard, configurar seus <br />{" "}
                produtos e começar a vender!
              </p>
              <center>
                <a href="https://app.fivemarket.com.br/">
                  <Button className="bg-slate-900 text-white mt-5">
                    Ir para meu painel
                  </Button>
                </a>
              </center>
            </div>
          </section>
          <section className="w-1/2 bg-slate-900 h-96 rounded-r-lg">
            <div className="pt-16">
              <center>
                <a href="https://app.fivemarket.com.br/">
                  <BiShareAlt color="white" size={100} />
                </a>
              </center>
              <h1 className="text-center font-display text-2xl font-bold tracking-tight text-white">
                Faça a conexão do seu servidor
              </h1>
              <p className="text-center text-white">
                Conecte o seu servidor em nossa plataforma.
              </p>
              <center>
                <a href="https://app.fivemarket.com.br/settings">
                  <Button className="bg-slate-900 text-white mt-5">
                    Ir para meu painel
                  </Button>
                </a>
              </center>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
