import avatar from '../assets/avatar.png'

function Head(props) {
    return (
        <div className="head">

            <div className="div-image-p">
                <img src={avatar} alt="" className='image-avatar'/>
                <h1> Médico {props.medico_nome} </h1>
                <h2> {props.medico_crm} </h2>
            </div>
            
            <button>
                Log off
            </button>

        </div>
    );
  }
  
  export default Head;