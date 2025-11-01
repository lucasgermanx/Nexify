
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
            <div style={{ paddingTop: '1rem' }}>
                <h4 style={{ color: 'white', fontWeight: '600', marginBottom: '8px' }}>Configurações</h4>
                <small style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Gerencie todas as configurações da sua conta e loja</small>
                <MenuComponent>
                    <Tab eventKey="profile" title="Perfil">
                        <ProfilePage />
                    </Tab>
                    <Tab eventKey="domain-integration" title="Configurações da loja">
                        <DomainSettingsPage />
                    </Tab>
                    <Tab eventKey="form-of-payments" title="Formas de Pagamento">
                        <PaymentsPage />
                    </Tab>
                    <Tab eventKey="template" title="Template">
                        <TemplatePage />
                    </Tab>
                    <Tab eventKey="subscriptions" title="Assinaturas">
                        <SubscriptionPage/>
                    </Tab>
                    <Tab eventKey="integrations" title="Integrações">
                        <IntegrationsPage />
                    </Tab>
                </MenuComponent>
            </div>
        </HeroSection>
    )
}