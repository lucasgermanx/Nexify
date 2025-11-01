const PLANS = [
    {
        name: "Starter",
        value: 19.90
    },
    {
        name: "Common",
        value: 39.90
    },
    {
        name: "Enterprise",
        value: 69.90
    }
];

export const getValueByName = (name) => PLANS.find(plan => plan.name === name)?.value;
