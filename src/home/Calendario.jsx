function Calendario() {
    return (
    <section className="padded">
     <div className="container">
      <aside className="calendario-resultados mb-4" aria-label="Calendario y resultados">
        <h2 className="calendario-resultados__titulo mb-3">calendario y resultados</h2>
        
        <div className="card">
          <div className="card-body">
            <h3 className="proximo-partido__titulo mb-3">PRÓXIMO PARTIDO</h3>
            
            <div className="mb-2">
              <span className="text-warning fw-bold">mié. 24 jul.</span>
              <span className="ms-2">USA Tour 2024</span>
            </div>
            
            <div className="row align-items-center">
              <div className="col-4 text-start">
                <img src="https://www.mancity.com/meta/media/yzscd2rf/manchester_city_fc_badge.png" 
                     alt="Escudo de Manchester City" width="40" height="40" className="me-2" />
                <span>Man City</span>
              </div>
              <div className="col-4 text-center">
                <span className="fs-5 fw-bold text-success">01:30</span>
                <span className="ms-1 text-muted">BST</span>
              </div>
              <div className="col-4 text-end">
                <span>Celtic</span>
                <img src="https://www.mancity.com/meta/media/4njkpt4h/celtic-full.png" 
                     alt="Escudo de Celtic" width="40" height="40" className="ms-2" />
              </div>
            </div>
          </div>
        </div>
      </aside>
      </div>
      </section>
    );
  }
  
  export default Calendario;