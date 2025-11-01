import React from "react";
import "../Style/AsideBar.css";
import CardComponent from "./CardComponent";

const AsideBarComponent = () => {
  return (
    <div className="aside-bar">
      <div>
        <h2 className="m-0">Tarefas para Hoje</h2>
      </div>
      <div style={{ paddingTop: "5%" }}>
        <CardComponent
          title="Tarefas Pendentes"
          value={5}
          description="Número total de tarefas pendentes para hoje."
        />

        <CardComponent
          title="Tarefas Concluídas"
          value={3}
          description="Número total de tarefas concluídas para hoje."
        />
        
        <CardComponent
          title="Tarefas Concluídas"
          value={3}
          description="Número total de tarefas concluídas para hoje."
        />
      </div>

      <div style={{ paddingTop: "10%" }}>
        <h2 className="m-0">Projetos Recentes</h2>
      </div>
      <div style={{ paddingTop: "5%" }}>
        <CardComponent
          title="Projetos Ativos"
          value={2}
          description="Número total de projetos ativos."
        />
      </div>
    </div>
  );
};

export default AsideBarComponent;
