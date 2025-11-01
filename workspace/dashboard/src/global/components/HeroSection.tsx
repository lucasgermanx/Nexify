import { Container } from "react-bootstrap";
import { SidebarComponent } from "./sidebar";
import { ContainerWrapper } from "./styles/hero-section.style";

const HeroSection = ({ children }: any) => {
  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflowX: 'hidden', width: '100vw' }}>
      <SidebarComponent />
      <ContainerWrapper>
        <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', padding: '0', boxSizing: 'border-box' }}>
          {children}
        </div>
      </ContainerWrapper>
    </div>
  );
};

export default HeroSection;
