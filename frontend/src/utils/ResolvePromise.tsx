import { ReactNode, ReactElement, useState, Suspense } from "react";
import { ErrorBoundary } from "./ErrorBoundary";

// .read()で解決済みならデータを、処理中ならプロミスを返す
export type asyncData<T> = { read: () => T };
function wrapPromise<T>(promise: Promise<T>): asyncData<T> {
    let status = 'pending';
    let result: T;

    const suspender = promise.then(
    (r) => {
        status = 'fulfilled';
        result = r;
    },
    (e) => {
        status = 'rejected';
        result = e;
    });

    const read = () => {
    if(status === 'pending') {
        throw suspender;
    } else if(status === 'rejected') {
        throw result;
    } else {
        return result;
    }
    };

    return { read };
}

type props<T> = {
    promise: Promise<T>; 
    loading: ReactNode;
    error: ReactNode;
    renderItem: (props: asyncData<T>) => ReactElement;
};

/* 
Suspenseで非同期処理を行うためのラップコンポーネント

引数
    promise:処理したいプロミス
    loading:プロミスの処理中に表示するJSX
    error:プロミス失敗時に表示するJSX
    renderItem: ( read()でプロミスの返り値を返す関数 ) => 解決後に表示するJSX
*/
export default function ResolvePromise<T>({ promise, loading, error, renderItem }: props<T> ) {
    const [response] = useState( wrapPromise<T>( promise ) );

    return (
        <ErrorBoundary fallback={error}>
            <Suspense fallback={loading}>
                { renderItem( response ) }
            </Suspense>
        </ErrorBoundary>
    );
};