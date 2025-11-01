import { Toaster } from "sonner"

export const ToastComponent = ({children}:any) => {
    return (
        <>
            <Toaster richColors position="top-center"></Toaster>
            {children}
        </>
    )
}