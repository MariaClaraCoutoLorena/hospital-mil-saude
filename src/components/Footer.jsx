import telefone from '../assets/telefone.png'
import pin from '../assets/pin.png'

function Footer() {

    return (
        <div className="footer">
            <div>
                <p>
                Hospital Mil Saúde 
                </p>
            </div>

            <div className="div-image-p">
                <img src={telefone} alt="" className='image-icons'/>
                <p>Contato: (12) 9 9999-9999</p>
            </div>
            
            <div className="div-image-p">
                <img src={pin} alt="" className='image-icons'/>
                <p>Rua Cesario Monsueto, 3000 - São José dos Campos - SP</p>
            </div>

        </div>
    );
  }
  
  export default Footer;