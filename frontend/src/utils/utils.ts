// データを取ってくる関数
export async function getFetchJson<T>(url:string): Promise<T> {
    const res = await fetch(url,
    {
        method:"GET",
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if (!res.ok) {
        throw new Error(res.statusText);
    }
    return await res.json();
}

// データをポストして、レスポンスを返す関数
export async function postFetchJson<T>(url:string, data:object): Promise<T> {
    const res = await fetch(url, {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify(data),
    });
    if (!res.ok) {
        throw new Error(res.statusText);
    }
    return await res.json();
}

//ハッシュ関数
export async function hashTextSHA256(text:string) {
    const encoder = new TextEncoder();
    const buffer = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
}