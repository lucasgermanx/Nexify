"use client";

import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { FaCheck } from "react-icons/fa6";
import secureLocalStorage from "react-secure-storage";

export const PlansCardComponent = ({ plan }: any) => {
  const router = useRouter();

  const handleSelectPlan = (plan_id: string) => {
    secureLocalStorage.setItem("selected_plan", plan_id);
    if (plan_id) {
      router.push("/checkout/store");
    }
  };

  return (
    <div className="px-3">
      <div
        className="bg-slate-900 h-[40rem] flex flex-col justify-between"
        style={{ borderRadius: "24px" }}
      >
        <div className="p-10">
          <h4 className="font-bold text-md text-white">{plan.name}</h4>
          <h2 className="font-bold text-3xl text-white pb-2">
            R$ {plan.price}
            <span className="text-sm font-regular text-white">/mês</span>
          </h2>
          <p className="text-sm pt-1 text-white">{plan.description}</p>

          <div className="pt-5">
            <hr />
          </div>

          <div className="pt-5">
            <p className="text-sm text-white">Oferecemos:</p>
            <div className="pt-3">
              {plan.features?.map((feature: any, index: any) => (
                <span
                  key={index}
                  className="flex items-center text-sm font-medium text-white gap-2"
                >
                  <FaCheck color="orange" className="mt-2" />
                  <p className="text-sm text-white pt-2">{feature}</p>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="p-5">
          <Button
            onPress={() => {
              handleSelectPlan(plan.id);
            }}
            radius="full"
            className="w-full bg-orange-400 text-white"
          >
            Selecionar plano
          </Button>
        </div>
      </div>
    </div>
  );
};
