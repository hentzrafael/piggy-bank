import API_URL from "@/common/api";

export const fetchAllAcounts = async (username: string) => {
    const res = await fetch(`${API_URL}/api/accounts?username=${username}` , {
        method: 'GET',
    });
    const {data} = await res.json();
    return data;
}