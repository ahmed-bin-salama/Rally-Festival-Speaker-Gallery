import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
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

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Application error:', error, errorInfo);
  }

  private handleReload = (): void => {
    window.location.hash = '';
    window.location.reload();
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0d0e12] text-gray-100 flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-[#151821] border border-gray-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-6 relative overflow-hidden">
            {/* Background glow accent */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#800020]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="w-16 h-16 rounded-2xl bg-[#800020]/20 border border-[#800020]/50 text-[#D4AF37] mx-auto flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>

            <div className="space-y-2">
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                An Unexpected Error Occurred
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                The Rally Speaker Gallery encountered a temporary runtime issue. Click below to reload the application.
              </p>
            </div>

            {this.state.error?.message && (
              <div className="bg-[#0d0e12] border border-rose-900/40 rounded-xl p-3 text-left font-mono text-xs text-rose-300 overflow-x-auto">
                {this.state.error.message}
              </div>
            )}

            <div className="pt-2">
              <button
                type="button"
                onClick={this.handleReload}
                className="w-full py-3 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-gray-950 hover:brightness-110 active:scale-[0.98] transition-all border border-[#FFF8DC] shadow-lg flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span>Reload Application</span>
              </button>
            </div>

            <p className="text-[11px] text-gray-500 pt-2">
              Rally Festival 2026 • Speaker Archive & Interview Guide
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
