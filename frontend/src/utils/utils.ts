export async function getFetchJson<T>(url:string): Promise<T> {
    const res = await fetch(url, {
        method:"GET",
    });
    if (!res.ok) {
        console.error('エラーが発生しました。ステータスコード：' + res.statusText);
    }
    return await res.json();
}

export async function postFetchJson<T>(url:string, data:object): Promise<T> {
    const res = await fetch(url, {
        method:"POST",
        headers: {"Content-Type": "application/json",},
        body:JSON.stringify(data),
    });
    if (!res.ok) {
        console.error('エラーが発生しました。ステータスコード：' + res.statusText);
    }
    return await res.json();
}