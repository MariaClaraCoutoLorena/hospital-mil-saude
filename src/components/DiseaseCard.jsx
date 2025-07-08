function DiseaseCard(params) {
    

    return( 
        <div className="DiseaseCard">
            <div className="DiseaseHeader">
                <div className="DiseaseName">{params.name}</div>
                <div className="DiseaseCID">CID: {params.cid}</div>
            </div>
            <div className="DiseaseDesc">{params.symptoms}</div>
        </div>
    )
}

export default DiseaseCard;