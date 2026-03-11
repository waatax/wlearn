import React from 'react';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="p-8 text-center text-red-500">
                    <h1 className="text-2xl font-bold">Oops! Something went wrong.</h1>
                    <p>The application encountered an error.</p>
                </div>
            );
        }
        return this.props.children;
    }
}
