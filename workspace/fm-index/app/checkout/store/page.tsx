"use client";

import { Button, Link, Select, SelectItem } from "@nextui-org/react";

import { HeaderCheckout } from "@/components/header-checkout.component";
import { CheckoutCreateStoreAction } from "@/core/client/actions/checkout/checkout.actions";
import { Input } from "@nextui-org/input";
import parse from "html-react-parser";
import { useEffect } from "react";
import secureLocalStorage from "react-secure-storage";

const type_coins = [
  {
    label: "BRL",
    value: "BRL",
  },
];

export default function Store() {
  const { addForm, dataForm, getErrorByType, HandlerCreateStore, CheckAvailability } =
    CheckoutCreateStoreAction();

  return (
    <>
      <HeaderCheckout/>
      <div className="pt-16">
        <h2 className="text-4xl font-bold text-center">Criar nova loja</h2>
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
            <h4 className="font-display font-bold tracking-tight text-orange-400">
              Dados da sua loja
            </h4>
            <h4 className="font-display font-bold tracking-tight text-slate-900">
              Integração & Conclusão
            </h4>
          </div>
        </div>
        <hr />
      </div>
      <main className="container mx-auto max-w-7xl px-6 flex-grow">
        <section className="grid grid-cols-12 gap-4 pt-10">
          <div className="col-span-8 pt-5">
            <Input
              type="text"
              label="Nome da sua loja"
              placeholder="FiveMarket"
              labelPlacement="outside"
              className="w-full mr-5"
              onChange={(e) => {
                addForm("store", e.target.value);
              }}
              errorMessage={
                getErrorByType("store")?.type == "store"
                  ? parse(`${getErrorByType("store")?.message}`)
                  : ""
              }
              isInvalid={
                getErrorByType("store")?.type == "store"
                  ? getErrorByType("store")?.isInvalid
                  : false
              }
            />
          </div>
          <div className="col-span-4 pt-5">
            <Select
              label="Moeda"
              placeholder="Selecione o tipo desejado."
              labelPlacement="outside"
              onChange={(e) => {
                addForm("store_money_type", e.target.value);
              }}
              errorMessage={
                getErrorByType("store_money_type")?.type == "store_money_type"
                  ? parse(`${getErrorByType("store_money_type")?.message}`)
                  : ""
              }
              isInvalid={
                getErrorByType("store_money_type")?.type == "store_money_type"
                  ? getErrorByType("store_money_type")?.isInvalid
                  : false
              }
            >
              {type_coins.map((coin) => (
                <SelectItem key={coin.value} value={coin.value}>
                  {coin.label}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="col-span-8 pt-2">
            <Input
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">https://</span>
                </div>
              }
              endContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">
                    fivemarket.com.br
                  </span>
                </div>
              }
              type="text"
              label="Website"
              placeholder="FiveMarket"
              labelPlacement="outside"
              className="w-full mr-5"
              onChange={(e) => {
                addForm("subdomain", e.target.value);
              }}
              errorMessage={
                getErrorByType("subdomain")?.type == "subdomain"
                  ? parse(`${getErrorByType("subdomain")?.message}`)
                  : ""
              }
              isInvalid={
                getErrorByType("subdomain")?.type == "subdomain"
                  ? getErrorByType("subdomain")?.isInvalid
                  : false
              }
            />
          </div>
          <div className="col-span-4 pt-8">
            <Button className="w-full bg-orange-400 text-white" onPress={()=>{CheckAvailability()}}  isDisabled={
              dataForm?.subdomain?.length === 0 ||
              getErrorByType("subdomain")?.isInvalid
            }>
              Verificar disponibilidade
            </Button>
          </div>
        </section>

        <div className="pt-10 flex justify-end gap-4">
          <Link href="/checkout/plans">
            <Button
              variant="solid"
              radius="full"
              size="md"
              className="p-5 pl-10 pr-10 bg-black text-white"
            >
              Alterar plano
            </Button>
          </Link>
          <Button
            onPress={()=>{
              HandlerCreateStore()
            }}
            variant="solid"   
            radius="full"
            size="md"
            className="p-5 pl-10 pr-10 bg-orange-400 text-white"
            isDisabled={
              dataForm?.subdomain?.length === 0 ||
              getErrorByType("subdomain")?.isInvalid ||
              dataForm?.store?.length === 0 ||
              getErrorByType("store")?.isInvalid ||
              dataForm?.store_money_type?.length === 0 ||
              getErrorByType("store_money_type")?.isInvalid
            }>
            Continuar
          </Button>
        </div>
      </main>
    </>
  );
}
