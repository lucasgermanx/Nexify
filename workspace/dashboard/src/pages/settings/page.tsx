
import HeroSection from "@/global/components/HeroSection"
import NavbarComponent from "@/global/components/navbar.component"
import { Tab } from "react-bootstrap"
import { MenuComponent } from "./components/menu.component"
import { DomainSettingsPage } from "./domain/page"
import { IntegrationsPage } from "./integrations/page"
import PaymentsPage from "./payments/page"
import { ProfilePage } from "./profile/page"
import { SubscriptionPage } from "./subscription/page"
import TemplatePage from "./template/page"


export const SettingsPage = () => {
    return (
        <HeroSection>
            <NavbarComponent/>
            <br />
            <MenuComponent>
                <Tab eventKey="profile" title="Perfil">
                    {<ProfilePage />}
                </Tab>
                <Tab eventKey="domain-integration" title="Configurações da loja" style={{ color: "black" }}>
                    {<DomainSettingsPage />}
                </Tab>
                <Tab eventKey="form-of-payments" title="Formas de Pagamento">
                    {<PaymentsPage />}
                </Tab>
                <Tab eventKey="template" title="Template">
                    {<TemplatePage />}
                </Tab>
                <Tab eventKey="subscriptions" title="Assinaturas">
                    <SubscriptionPage/>
                </Tab>
                <Tab eventKey="integrations" title="Integrações">
                    {<IntegrationsPage />}
                </Tab>
            </MenuComponent>
            <br />
        </HeroSection>
    )
}