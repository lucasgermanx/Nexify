"use client";

import { HeaderCheckout } from "@/components/header-checkout.component";
import { PlansComponent } from "@/components/shared/plans.component.tsx";

export default function Home() {
  return (
    <>
      <HeaderCheckout/>
      <div className="pt-16">
        <h2 className="text-4xl font-bold text-center">Selecione um plano</h2>
        <p className="text-base text-slate-400 pt-2 text-center">
          Selecione um plano que esteja de acordo com suas necessidades
        </p>
      </div>
      <div className="pt-16">
        <div className="container mx-auto max-w-7xl px-6 flex-grow pb-5">
          <div className="flex justify-between">
            <h4 className="font-display font-bold tracking-tight text-orange-400">
              Selecionar Plano
            </h4>
            <h4 className="font-display font-bold tracking-tight text-slate-900">
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
        <PlansComponent />
      </main>
    </>
  );
}
