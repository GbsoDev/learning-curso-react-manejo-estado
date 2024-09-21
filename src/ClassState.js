import React from "react";

const SECURITY_CODE = 'paradigma';
class ClassState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      loading: false,
      value: '',
    }
  }

  setError = (error) => this.setState({ error: error });
  setLoading = (loading) => this.setState({ loading: loading });
  setValue = (value) => this.setState({ value: value });

  componentDidUpdate() {
    const { loading, value } = this.state;
    if (!!loading) {
      setTimeout(() => {
        try {
          console.log("Empezando el update");
          if (value !== SECURITY_CODE) {
            throw new Error("El código es incorrecto")
          } else {
            this.setError(false);
          }
        } catch (error) {
          console.log("Error en el update");
          this.setError(true);
        }
        finally {
          console.log("Finalizando el update");
          this.setLoading(false);
        }
      }, 2000);
    }
  }

  render() {
    const { name } = this.props;
    const { error, loading, value } = this.state;
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>Por favor, escribe el código de seguridad</p>

        {!!error && !loading && (
          <p>Error: El código es incorrecto</p>
        )}

        {!!loading && (
          <p>Cargando...</p>
        )}

        <input placeholder="Código de seguridad" 
          value={value} onChange={(event) => this.setValue(event.target.value)}
        />
        <button
          onClick={() =>
            this.setLoading(true)
          }
        >Comprobar</button>
      </div>
    );
  };
}

export { ClassState };