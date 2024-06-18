export default async function getJson<T>(url:string): Promise<T> {
    const res = await fetch(url);
    if (!res.ok) {
        console.error('エラーが発生しました。ステータスコード：' + res.statusText);
    }
    return await res.json();
}