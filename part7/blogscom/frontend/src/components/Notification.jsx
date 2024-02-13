const Notification = ({ message }) => {
    return message > 0 ? <div className="noification">{message}</div> : null
}

export default Notification