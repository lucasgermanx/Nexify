import {
  HeaderBackground,
  HeaderContainer,
  HeaderContent,
  HeaderText,
  HeaderTitle,
} from "./styles/header-component.style";

import NavbarComponent from "@/global/components/NavbarComponent";
import parse from "html-react-parser";
import useStore from "../hooks/store.hook";

export const HeaderComponent = () => {
  const { store } = useStore();
  return (
    <>
      {store ? (
        <>
          <NavbarComponent />
          <HeaderContainer>
            <HeaderBackground bgUrl={'data:image/png;base64,'+store?.contents?.[0].banner}>
              <HeaderContent>
                <HeaderTitle>
                  {parse(String(store?.contents?.[0].title))}
                </HeaderTitle>
                <HeaderText>
                  {parse(String(store?.contents?.[0].description))}
                </HeaderText>
              </HeaderContent>
            </HeaderBackground>
          </HeaderContainer>
        </>
      ) : (
        ""
      )}
    </>
  );
};
