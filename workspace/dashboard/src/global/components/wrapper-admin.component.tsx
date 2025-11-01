import logo from "@/assets/images/icon_orange.png"
import { useManageStore } from "@/core/client/hooks/select-store-zuustand"
import { useAuth } from "@/core/client/providers/auth/auth.provider"
import { Store } from "@/core/client/providers/store/store-provider.types"
import { useStore } from "@/core/client/providers/store/store.provider"
import { SubscriptionPage } from "@/pages/settings/subscription/page"
import { useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import styled from "styled-components"
import LoadingPageComponent from "./loading-page.component"

export const Logo = styled.img`
  width: 10%;
`;


export const WrapperAdminLayout = ({ children }: any) => {
    const { user } = useAuth()
    const { stores } = useStore()
    const { store_reference } = useManageStore()
    const [store, setStore] = useState<Store | undefined>();

    useEffect(() => {
        const filteredStores = stores?.filter(store => store.store_reference === store_reference);
        if (filteredStores) {
            setStore(filteredStores[0])
        }
    }, [store_reference, stores])

    return (
        <>
            {!user ? (
                <>
                    <LoadingPageComponent />
                </>
            ) : (
                <>
                    {store?.store_status == "expired" ? <>
                        <Container className="mt-5">
                            <center className="mb-5">
                                <Logo src={logo} alt="Logo" />
                                <h4 className="mt-3 mb-3">Sua fatura expirou</h4>
                            </center>
                            <SubscriptionPage />
                        </Container>
                    </> :  children }
                </>
            )}
        </>
    )
}
