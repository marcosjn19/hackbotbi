
function ClientRow({id, mail, name, lastname, lat, long}) {  
    const googleMapsUrl = `https://www.google.com/maps?q=${lat},${long}`;

  return (
    <>
      <tr>
        <td>{name} {lastname}</td>
        <td>{mail}</td>
        <td><p>Latitud:</p> <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">{lat}</a>
        <p>Longitud:</p> <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">{long}</a></td>
      </tr>
    </>
  )
}

export default ClientRow