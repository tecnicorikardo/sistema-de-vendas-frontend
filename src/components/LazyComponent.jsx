import { lazy, Suspense } from 'react';

// Exemplo de componente que será carregado dinamicamente
const DynamicChart = lazy(() => import('./DynamicChart'));

export function LazyComponent() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <DynamicChart />
    </Suspense>
  );
} 