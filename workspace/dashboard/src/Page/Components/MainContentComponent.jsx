import React, { useEffect, useState } from "react";
import CardComponent from "./CardComponent";
import { FaSearch, FaBookmark } from "react-icons/fa";
import UsersTableComponent from "./UsersTableComponent";
import ChartComponent from "./ChartLineComponent";

const MainContentComponent = () => {
  const [users, setUsers] = useState([]);
  const [carts, setCarts] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));

    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));

    fetch("https://fakestoreapi.com/carts")
      .then((res) => res.json())
      .then((data) => setCarts(data));
  }, []);

  return (
    <>
      <div className="header">
        <div className="header-text">
          <h1 className="m-0">Painel de Controle</h1>
          <p className="m-0">Últimas atualizações de hoje</p>
        </div>
        <div className="header-buttons">
          <button className="left-button">
            <FaSearch fontSize={20} />
          </button>
          <button className="right-button">
            <FaBookmark fontSize={20} />
          </button>
        </div>
      </div>
      
      <div className="main-content-container">
        <div className="cards-container">
          <CardComponent
            title="Total de Carrinhos"
            value={carts?.length}
            description="Número total de carrinhos no sistema."
          />
          <CardComponent
            title="Total de Produtos"
            value={products?.length}
            description="Número total de produtos na plataforma."
          />
           <CardComponent
            title="Total de Usuários"
            value={users?.length}
            description="Número total de usuários na plataforma."
          />
        </div>
      </div>

      <div className="mt-3">
        <h4>Gráfico de Vendas</h4>
        <ChartComponent/>
      </div>

      <div className="mt-3">
        <h4>Lista de Usuários</h4>
        <UsersTableComponent />
      </div>
    </>
  );
};

export default MainContentComponent;
