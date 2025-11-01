import { Container } from "react-bootstrap";
import { SidebarComponent } from "./sidebar";

const HeroSection = ({ children }: any) => {
  return (
    <div className="d-flex">
      <SidebarComponent />
      <Container>
        {children}
      </Container>
    </div>
  );
};

export default HeroSection;
