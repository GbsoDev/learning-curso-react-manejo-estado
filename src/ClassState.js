import React from "react";

class ClassState extends React.Component {
  render() {
    const { name } = this.props;
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>Por favor, escribe el código de seguridad</p>
        <input placeholder="Código de seguridad" />
        <button>Comprobar</button>
      </div>
    );
  };
}

export { ClassState };