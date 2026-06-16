import Stripe from "stripe";

let _stripe: Stripe | null = null;

function getInstance(): Stripe {
  if (!_stripe) _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  return _stripe;
}

export const stripe: Stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    const instance = getInstance();
    const value = instance[prop as keyof Stripe];
    if (typeof value === "function") return (value as Function).bind(instance);
    return value;
  },
});
