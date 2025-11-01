import Footer from "@/components/footer";
import { NavbarComponent } from "@/components/navbar";
import { PlansComponent } from "@/components/shared/plans.component.tsx";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { BiLayer } from "react-icons/bi";

export default function Home() {
  return (
    <>
      <NavbarComponent />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-20 text-center lg:pt-32">
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-tight text-slate-900 sm:text-7xl">
          Monetize{" "}
          <span className="relative whitespace-nowrap text-orange-400">
            <svg
              aria-hidden="true"
              viewBox="0 0 418 42"
              className="absolute left-0 top-2/3 h-[0.58em] w-full fill-orange-300/70"
              preserveAspectRatio="none"
            >
              <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
            </svg>
            <span className="relative">seu servidor</span>
          </span>{" "}
          de FiveM agora mesmo!
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
          A FiveMarket chegou pra acabar com as vendas manuais dos produtos do
          seu servidor! Conheça a nossa plataforma agora mesmo com a nossa
          avaliação gratuita. Entregas em tempo real, sem taxas extras e
          instalação sem pagamento adicional.
        </p>
        <div className="mt-10 flex justify-center gap-x-6">
          <a
            className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900"
            color="slate"
            href="/auth/login"
          >
            Começar 7 dias gratuito
          </a>
          <a
            className="group inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-none ring-slate-200 text-slate-700 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-blue-600 focus-visible:ring-slate-300"
            color="slate"
            href="https://www.youtube.com/@fivemarketbrasil"
          >
            <svg
              aria-hidden="true"
              className="h-3 w-3 flex-none fill-blue-600 group-active:fill-current"
            >
              <path d="m9.997 6.91-7.583 3.447A1 1 0 0 1 1 9.447V2.553a1 1 0 0 1 1.414-.91L9.997 5.09c.782.355.782 1.465 0 1.82Z" />
            </svg>
            <span className="ml-3">Assistir trailer</span>
          </a>
        </div>

        
      </div>

      <section className="gap-4 py-8 md:py-10 mt-10">
          <p className="text-center">Trabalhamos com os melhores do mercado</p>
          <div className="mt-5 flex flex-col items-center  gap-8 bg-slate-800 p-6 md:p-10 rounded-md">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-x-12 sm:gap-y-0 xl:flex-row xl:gap-x-12 xl:gap-y-0">
              <img
                alt="Transistor"
                loading="lazy"
                width="158"
                height="48"
                decoding="async"
                data-nimg="1"
                style={{ color: "transparent" }}
                src="/partners/sendgrid.png"
                className="mx-auto"
              />
              <img
                alt="Transistor"
                loading="lazy"
                width="158"
                height="40"
                decoding="async"
                data-nimg="1"
                style={{ color: "transparent" }}
                src="/partners/cloudflare.png"
                className="mx-auto"
              />
              <img
                alt="Transistor"
                loading="lazy"
                width="158"
                height="48"
                decoding="async"
                data-nimg="1"
                style={{ color: "transparent" }}
                src="/partners/raze.png"
                className="mx-auto"
              />
              <img
                alt="Transistor"
                loading="lazy"
                width="108"
                height="48"
                decoding="async"
                data-nimg="1"
                style={{ color: "transparent" }}
                src="/partners/aws.png"
                className="mx-auto"
              />
            </div>
          </div>
        </section>
        
      <section className="gap-4 py-8 md:py-10" id="benefitis">
        <h2 className="text-4xl font-bold text-center">
          Alguns dos benefícios que daremos ao sua loja
        </h2>
        <p className="text-base text-slate-400 pt-2 text-center">
          Desfrute dos benefícios exclusivos para impulsionar seu servidor.
        </p>
        <div className="container mx-auto max-w-7xl px-6 md:px-8 lg:px-16 xl:px-20 mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full w-10 h-10 flex-shrink-0 bg-slate-900">
                <center>
                  <div className="pt-2">
                    <BiLayer color="orange" fontSize="22" />
                  </div>
                </center>
              </div>
              <h3 className="font-display text-xl font-bold tracking-tight text-slate-900 pt-4">
                Sempre atualizado:
              </h3>
              <p className="font-display text-base text-slate-700">
                Novas funcionalidades, melhorias e correções de bugs a todo
                momento. Isso é uma das vantagens que garantimos.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full w-10 h-10 flex-shrink-0 bg-slate-900">
                <center>
                  <div className="pt-2">
                    <BiLayer color="orange" fontSize="22" />
                  </div>
                </center>
              </div>
              <h3 className="font-display text-xl font-bold tracking-tight text-slate-900 pt-4">
                Suporte 24/7:
              </h3>
              <p className="font-display text-base text-slate-700">
                Nossa equipe envolve diversos especialistas que estão preparados
                para atendê-lo de forma eficiente e simples.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full w-10 h-10 flex-shrink-0 bg-slate-900">
                <center>
                  <div className="pt-2">
                    <BiLayer color="orange" fontSize="22" />
                  </div>
                </center>
              </div>
              <h3 className="font-display text-xl font-bold tracking-tight text-slate-900 pt-4">
                Proteção de Dados:
              </h3>
              <p className="font-display text-base text-slate-700">
                Aqui seus dados estão protegidos e em segurança. A FiveMarket
                garante proteção contra tentativas de fraude ou invasões de
                conta.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-100 p-5" style={{ marginTop: "5%" }}>
        <div className="container mx-auto max-w-7xl p-16 px-6 flex-grow">
          <h2 className="text-4xl font-bold text-center">
            Faça seu cadastro e escale o seu projeto <br /> com a FiveMarket!
          </h2>
          <p className="text-base text-slate-400 pt-2 text-center">
            Ainda tem dúvidas? Entre em contato com a nossa equipe.
          </p>
          <div className="flex justify-center items-center pt-5">
            <Link href="https://discord.com/invite/pW6Dy5DrsJ" target="_blank">
              <Button className="bg-orange-400 text-white" radius="full">
                Entrar em contato
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="p-5" id="plans">
        <div className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
          <h2 className="text-4xl font-bold text-center">
            Descubra Nossos Planos Exclusivos
          </h2>
          <p className="text-base text-slate-400 pt-2 text-center">
            Explore nossos planos exclusivos e encontre a solução perfeita para
            impulsionar seu negócio. <br /> Descubra o caminho para o sucesso
            com nossos planos flexíveis e vantajosos.
          </p>        
        </div>

        <PlansComponent/>
      </section>
      <Footer />
    </>
  );
}
