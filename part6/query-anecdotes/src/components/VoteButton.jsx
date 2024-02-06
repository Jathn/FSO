import { useContext } from 'react'
import NotificationContext from '../contexts/notificationContext'

const VoteButton = ({anecdote, voteFunction}) => {
    const [notification, dispatch] = useContext(NotificationContext)

    const onVoteClick = () => {
        voteFunction(anecdote)
        dispatch({type: "SET_NOTIFICATION", data: `You voted for ${anecdote.content}`})
    }
    return (
        <button onClick={onVoteClick}>upvote</button>
    )
}

export default VoteButton