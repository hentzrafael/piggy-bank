import API_URL from "@/common/api";

export const fetchAllAcounts = async (username: string) => {
    const res = await fetch(`${API_URL}/api/accounts?username=${username}`, {
        method: 'GET',
    });
    const { data } = await res.json();
    return data;
}

export const withdrawFromAccount = async (accountId: string, amount: number) => {
    const res = await fetch(`${API_URL}/api/accounts/withdraw`, {
        method: 'POST',
        body: JSON.stringify({ accountId, amount }),
    });

    const data = await res.json();
    return data;
}

export const depositInAccount = async (accountId: string, amount: number) => {
    const res = await fetch(`${API_URL}/api/accounts/deposit`, {
        method: 'POST',
        body: JSON.stringify({ accountId, amount }),
    });

    const data = await res.json();
    return data;
}

export const transferBetweenAccounts = async (originId: string, destinationId: string, amount: number) => {
    const res = await fetch(`${API_URL}/api/accounts/transfer`, {
        method: 'POST',
        body: JSON.stringify({ originId, destinationId, amount }),
    });
}