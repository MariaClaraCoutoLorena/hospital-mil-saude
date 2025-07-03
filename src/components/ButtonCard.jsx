function ButtonCard(props) {

    return (
        <div className="buttoncard">
            <a href={props.route_direct}>{props.children}</a>
        </div>
    );
  }
  
  export default ButtonCard;