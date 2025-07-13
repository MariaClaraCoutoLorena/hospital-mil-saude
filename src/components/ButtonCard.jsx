import { Link } from 'react-router-dom';

function ButtonCard(props) {
    const rota = props.id_info ? `${props.route_direct}/${props.id_info}` : props.route_direct

    return (
        <Link to={rota} className="buttoncard">
            {props.children}
        </Link>
    );
  }
  
  export default ButtonCard;