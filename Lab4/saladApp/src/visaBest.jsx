import { useOutletContext } from "react-router-dom";

function visaBest() {
  const { bestallning } = useOutletContext();
  if (!bestallning) {
    return (
      <div className="alert alert-warning">
        Ingen orderinformation tillgänglig
      </div>
    );
  }

  return (
    <div className="toast show" role="alert">
      <div className="toast-header"> Orderbekräftelse</div>
      <div className="toast-body">
        Status: {bestallning.status}
        <br></br>
        Tid: {bestallning.timestamp}
        <br></br>
        Ordernummer: {bestallning.uuid}
        <br></br>
        Antal sallader {bestallning.order.length}
        <br></br>
        Pris: {bestallning.price}
      </div>
    </div>
  );
}

export default visaBest;
