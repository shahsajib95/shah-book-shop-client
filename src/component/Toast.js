const Toast = ({msg, handleShow, bgColor}) => {
    return(
        <div className={`toast show position-fixed text-light ${bgColor}`}
        style={{ top: '5px', right: '5px', zIndex: 9, minWidth: '280px' }} >

            <div className={`toast-header ${bgColor} text-light`}>

                <span type="button" className="me-3 close text-light" 
                data-dismiss="toast" style={{ outline: 'none'}} 
                onClick={handleShow}> <h3>x</h3></span>
                <strong className="mr-auto text-light">{msg.title}</strong>
            </div>

            <div className="toast-body">{msg.msg}</div>

        </div>
    )
}

export default Toast