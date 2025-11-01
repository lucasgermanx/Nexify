import plans from "@/core/client/utils/jsons/plans.json";
import { PlansCardComponent } from "./plans-card.component";

export const PlansComponent = () => {
  return (
    <section>
      <div className="container mx-auto max-w-7xl px-6 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5" style={{ paddingTop: "6%" }}>
          {plans.plans?.map((plan: any) => (
            <PlansCardComponent key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
};
