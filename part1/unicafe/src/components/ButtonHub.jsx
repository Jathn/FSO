import { ReactPropTypes } from "react"

const ButtonHub = (props) => {
    
    const prompt = props.prompt
    const alternatives = props.alternatives
    const clickFunction = props.onButtonClick
    
    const buttons = []

    for (let i = 0; i < alternatives.length; i++) {
        buttons.push(<button onClick={() => clickFunction(alternatives[i])} key={i + 1}>
                        {alternatives[i]}
                    </button>)
    }

    return (
        <div>
         <h1>{prompt}</h1>
         {buttons}
        </div>
    )
}
// ButtonHub.propTypes = {
//     prompt: ReactPropTypes.string.isRequired,
//     alternatives: ReactPropTypes.list.isRequired,
//     onButtonClick: ReactPropTypes.function.isRequired
// }
export default ButtonHub