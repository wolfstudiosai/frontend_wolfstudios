export const verifyPayment = async (sessionId: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/payments/${sessionId}`);
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error, 'error');
    }
};
