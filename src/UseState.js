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

  const onValueChange = (value) => {
    setState(prevstate => ({
      ...prevstate,
      value: value
    }));
  }
  
  const onCheck = () => {
    setState(prevstate => ({
      ...prevstate,
      loading: true,
    }));
  };

  const onDelete=()=>{
    setState(prevstate => ({
      ...prevstate,
      error: false,
      delete: true,
    }));
  }

  const onError=()=>{
    setState(prevstate => ({
      ...prevstate,
      error: true,
    }));
  }

  const onConfirm = () => {
    setState(prevState => ({
      ...prevState,
      confirmed: true,
    }));
  };

  const onCancel = () => {
    setState(prevState => ({
      ...prevState,
      delete: false,
      confirmed: false,
    }));
  };

  React.useEffect(() => {
    if (!!state.loading) {
      setTimeout(() => {
        try {
          console.log("Empezando el efecto");
          if (state.value !== SECURITY_CODE) {
            throw new Error("El código es incorrecto")
          } else {
            onDelete();
          }
        } catch (error) {
          onError();
        }
        finally {
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
          value={state.value} onChange={(event) => onValueChange(event.target.value)}
        />

        <button
          onClick={onCheck}
        >Comprobar</button>
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