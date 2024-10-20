import { Component } from "react";
import { ErrorInfo, ReactNode } from "react";

export class ErrorBoundary extends Component<{fallback:ReactNode; children:ReactNode}, {hasError:boolean}> {
    constructor(props: {fallback: ReactNode; children: ReactNode}) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(): { hasError: boolean } {
      // 子コンポーネントで例外が発生すると呼ばれる。
      // 戻り値では、コンポーネントの状態を返す必要がある。
      return { hasError: true };
    }
  
    componentDidCatch(error: Error, info: ErrorInfo) {
      // 発生したエラーのログを取得する
      console.log(error, info.componentStack);
    }
  
    render() {
      if (this.state.hasError) {
        // エラーがある場合は、fallbackをレンダリングする
        return <>{this.props.fallback}</>
      }
      // エラーがない場合は、childrenをレンダリングする
      return this.props.children;
    }
  }