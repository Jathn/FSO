import "./Notice.css"

const Notice = (props) => {
    if (props.message === null) {
      return null
    }
  
    return (
      <div className='note'>
        {props.message}
      </div>
    )
}

export default Notice