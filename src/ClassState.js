import React from "react";

class ClassState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false
    }
  }

  render() {
    const { name } = this.props;
    const { error } = this.state;
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>Por favor, escribe el código de seguridad</p>

        {!!error && (
          <p>Error: El código es incorrecto</p>
        )}

        <input placeholder="Código de seguridad" />
        <button
          onClick={() => 
            this.setState(prevState => ({ error: !prevState.error }))
          }
        >Comprobar</button>
      </div>
    );
  };
}

export { ClassState };