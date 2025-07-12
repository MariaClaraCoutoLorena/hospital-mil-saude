import avatar from '../assets/avatar.png'

function Head(props) {
    const medico = props.medico
    return (
        <div className="head">

            <div className="div-image-p">
                <img src={avatar} alt="" className='image-avatar'/>
                <h1> Médico {medico.nome} </h1>
                <h2> {medico.crm} </h2>
            </div>
            
            <button>
                Log off
            </button>

        </div>
    );
  }
  
  export default Head;