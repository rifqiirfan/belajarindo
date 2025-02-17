import { LoaderCircle } from "../loaders"

/* Component Style Extensions (CSX) */
export function CsxCorenderBase({ state, fallback, children }: { state: boolean, isFusion?: boolean, fallback: React.ReactNode, children: React.ReactNode }) {
  // eligible, protect is !state not state
  if (state) {
    return <>{children}</>
  }
  
  return <>{fallback}</>
}

// For Loading state, and other state like loading
export function CsxCorenderFull({ state, fallback, children }: { state: boolean, fallback: React.ReactNode, children: React.ReactNode }) {
  return <>
    {state && fallback}
    {children}
  </>
}

export function CsxLoadingBlur({ state, children }: { state: boolean, children: React.ReactNode }) {
  return <CsxCorenderFull state={state}
    fallback={<div className="absolute inset-0 backdrop-blur-sm z-10 flex items-center justify-center">
      <LoaderCircle />
    </div>}>
    {children}
  </CsxCorenderFull>
}