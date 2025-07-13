function ConsultaCard(params) {
    

    return( 
        <div className="card">
            <div className="cardHeader">
                <div className="consultaName">
                    {params.nome} <p>{params.idade} Anos</p>
                </div>
                <div className="DiseaseCID">{params.data_consulta}</div>
            </div>
            <div className="cardDesc">{params.descricao}</div>
        </div>
    )
}

export default ConsultaCard;