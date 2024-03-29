const Notification = ({ message }) => {
    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
    }
    return message > 0 ? <div style={style}>{message}</div> : null
}

export default Notification