import {loadStripe} from '@stripe/stripe-js'

export async function getSubscribe(){
    const stripeJs = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
    return stripeJs;
}