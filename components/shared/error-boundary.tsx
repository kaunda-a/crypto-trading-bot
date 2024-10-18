import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-theme-950">
            <h1 className="text-4xl font-bold text-theme-600 dark:text-theme-400 mb-4">
              Oops! Something went wrong.
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              We're working on fixing the issue. Please try again later.
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="px-6 py-3 bg-theme-500 text-white rounded-lg hover:bg-theme-600 transition-colors duration-300"
            >
              Try Again
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
