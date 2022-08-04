import LoadingSpinner from './common/LoadingSpinner';
import React, { Suspense } from 'react';
import ErrorBoundary from './ErrorBoundary';

interface Props {
  pendingFallback?: React.ReactNode;
  rejectedFallback: React.ReactNode;
  children: React.ReactNode;
}
const AsyncBoundary = ({
  pendingFallback = <LoadingSpinner />,
  rejectedFallback,
  children,
}: Props) => {
  return (
    <ErrorBoundary fallback={rejectedFallback}>
      <Suspense fallback={pendingFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default AsyncBoundary;
