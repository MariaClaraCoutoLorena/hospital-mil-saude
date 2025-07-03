function DiseaseCard(params) {
    

    return( 
        <div className="DiseaseCard">
            <div className="DiseaseName">{params.name}</div>
            <div className="DiseaseCID">{params.cid}</div>
        </div>
    )
}

export default DiseaseCard;