import React from "react";

const SECURITY_CODE = 'paradigma';
function UseState({ name }) {
  const [state, setState] = React.useState({
    error: false,
    value: '',
    loading: false,
    delete: false,
    confirmed: false,
  });

  console.log(state);
  React.useEffect(() => {
    if (!!state.loading) {
      setTimeout(() => {
        try {
          console.log("Empezando el efecto");
          if (state.value !== SECURITY_CODE) {
            throw new Error("El código es incorrecto")
          } else {
            setState(prevstate => ({
              ...prevstate,
              error: false,
              delete: true,
            }));
          }
        } catch (error) {
          console.log("Error en el efecto");
          setState(prevstate => ({
            ...prevstate,
            error: true,
          }));
        }
        finally {
          console.log("Finalizando el efecto");
          setState(prevstate => ({
            ...prevstate,
            loading: false,
          }));
        }
      }, 2000);
    }
  }, [state.loading])

  if (!state.delete && !state.confirmed) {
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>Por favor, escribe el código de seguridad</p>

        {!!state.error && !state.loading && (
          <p>Error: El código es incorrecto</p>
        )}

        {!!state.loading && (
          <p>Cargando...</p>
        )}

        <input placeholder="Código de seguridad"
          value={state.value} onChange={
            (event) => setState({
              ...state,
              value: event.target.value
            })
          }
        />

        <button
          onClick={() => setState({
            ...state,
            loading: true,
          })}
        >Comprobar</button>
      </div>
    );
  } else if (!!state.delete && !state.confirmed) {
    return (
      <>
        <p>Confirma la eliminación</p>
        <button onClick={() => setState({
          ...state,
          confirmed: true,
        })}
        >Confirmar</button>
        <button onClick={() => setState({
          ...state,
          delete: false,
        })}
        >Cancelar</button>
      </>
    )
  } else {
    return (
      <>
        <p>Eliminado con éxito</p>
        <button onClick={() => setState({
          ...state,
          delete: false,
          confirmed: false,
        })}
        >Volver</button>
      </>
    );
  }
}

export { UseState };