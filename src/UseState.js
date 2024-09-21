import React from "react";

const SECURITY_CODE = 'paradigma';
function UseState({ name }) {
  const [error, setError] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!!loading) {
      setTimeout(() => {
        try {
          console.log("Empezando el efecto");
          if (value !== SECURITY_CODE) {
            throw new Error("El código es incorrecto")
          } else {
            setError(false);
          }
        } catch (error) {
          console.log("Error en el efecto");
          setError(true)
        }
        finally {
          console.log("Finalizando el efecto");
          setLoading(false);
        }
      }, 2000);
    }
  }, [loading])

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
        value={value} onChange={(event) => setValue(event.target.value)}
      />

      <button
        onClick={() => setLoading(true)}
      >Comprobar</button>
    </div>
  );
}

export { UseState };