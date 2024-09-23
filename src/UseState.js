import React from "react";
import { reducer, initialState, actionTypes } from "./UseReducer";

const SECURITY_CODE = 'paradigma';
function UseState({ name }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  console.log(state);

  const onValueChange = ({target:{value: newValue}}) => {
    dispatch({ type: actionTypes.valueChange, payload: newValue });
  }

  const onCheck = () => {
    dispatch({ type: actionTypes.check });
  };

  const onDelete = () => {
    dispatch({ type: actionTypes.delete });
  }

  const onError = () => {
    dispatch({ type: actionTypes.error });
  }

  const onConfirm = () => {
    dispatch({ type: actionTypes.confirm });
  };

  const onCancel = () => {
    dispatch({ type: actionTypes.cancel });
  };

  React.useEffect(() => {
    if (!!state.loading) {
      setTimeout(() => {
        console.log("Empezando el efecto");
        if (state.value !== SECURITY_CODE) {
          onError();
          console.log("Error en el efecto");
        } else {
          onDelete();
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
          value={state.value} onChange={onValueChange}
        />

        <button onClick={onCheck}>Comprobar</button>
      </div>
    );
  } else if (!!state.delete && !state.confirmed) {
    return (
      <>
        <p>Confirma la eliminación</p>
        <button onClick={onConfirm}>Confirmar</button>
        <button onClick={onCancel}>Cancelar</button>
      </>
    )
  } else {
    return (
      <>
        <p>Eliminado con éxito</p>
        <button onClick={onCancel}>Volver</button>
      </>
    );
  }
}

export { UseState };