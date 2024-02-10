import API_URL from "@/common/api";

export const makeLogin = async (username: string, password: string) => {
    const res = await fetch(`${API_URL}/api/user`, {
        method: 'POST',
        body: JSON.stringify({
            "username": username,
            "password": password
        }),
    });
    const data  = await res.json();
    return data;
}