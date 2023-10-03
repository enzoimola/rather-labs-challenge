import React, { ErrorInfo, ReactNode } from 'react';
import { Group } from '@mantine/core';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}
export class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        // Define a state variable to track whether is an error or not
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: unknown) {
        console.log(error);
        // Update state so the next render will show the fallback UI

        return { hasError: true };
    }

    componentDidCatch(error:Error, errorInfo:ErrorInfo) {
        // You can use your own error logging service here
        console.log({ error, errorInfo });
    }

    render() {
        // Check if the error is thrown
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <Group>
                    <h2>Oops, there is an error!</h2>
                    <button
                      type="button"
                      onClick={() => this.setState({ hasError: false })}
                    >
                        Try again?
                    </button>
                </Group>
            );
        }

        // Return children components in case of no error

        return this.props.children;
    }
}
