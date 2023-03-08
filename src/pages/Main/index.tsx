import { Link } from "react-router-dom";
import { ColorModeSwitcher } from "../../components/color-mode-switcher";
import { Content } from "../../routers";
import { Footer, Header, Logo, Menu, Sidebar, SLink, SMain } from "./styles";

export const Main = () => {
  return (
    <div>
      <Header>
        <Logo>MyDev`s</Logo>
        <ColorModeSwitcher />
      </Header>
      <SMain>
        <Sidebar>
          <Menu>
            <Link to="/">
              <SLink>Desenvolvedores</SLink>
            </Link>
            <Link to="/levels">
              <SLink>Niveis Profissionais</SLink>
            </Link>
          </Menu>
        </Sidebar>
        <Content />
      </SMain>
      <Footer />
    </div>
  );
};
