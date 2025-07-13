function DiseaseCard(params) {
    

    return( 
        <div className="card">
            <div className="cardHeader">
                <div className="DiseaseName">{params.name}</div>
                <div className="DiseaseCID">CID: {params.cid}</div>
            </div>
            <div className="cardDesc">{params.symptoms}</div>
        </div>
    )
}

export default DiseaseCard;