import styles from './styles.module.scss'
import {signIn, useSession} from "next-auth/client";
import {api} from "../../services/api";
import {getSubscribe} from "../../services/stripe-js";

interface SubscribeButtonProps {
    priceId: string;
}

export function SubscribeButton({priceId}: SubscribeButtonProps) {
    const [session] = useSession();

    async function handleSubscribe() {
        if (!session) {
            await signIn('github');
            return;
        }
        try {
            const response = await api.post('/subscribe')
            const {sessionId} = response.data;
            const stripe = await getSubscribe();
            await stripe.redirectToCheckout({sessionId});
        } catch (err) {
            console.log('Error - Subscribe', err)
            alert(err.message)
        }
    }

    return (
        <button type="button" className={styles.subscriberButton} onClick={handleSubscribe}>
            Subscribe Now
        </button>
    )
}