import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY);

export async function initiateCheckout({ lineItems } = {}) {
    console.log('Checking out...');

    const stripe = await stripePromise;

    const options = {
      mode: "payment",
      lineItems: lineItems,
      successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: window.location.origin,
    };

    console.log(options);

    await stripe.redirectToCheckout(options);
}