import Statistic from "../components/Statistic";

const StatViewer = ({ good, ok, bad }) => {
    const total = good + ok + bad;
    const average = good > ok && good > bad ? "good" : ok >= bad ?  "ok" : "bad";
    const positive = Math.floor((good / total) * 100) + "%";
    
    if (total === 0) {
        return <p>No feedback given</p>;
    }
    
    return (
        <div>
        <h2>Statistics</h2>
        <table>
            <tbody>
            <Statistic text="Good" value={good} />
            <Statistic text="Ok" value={ok} />
            <Statistic text="Bad" value={bad} />
            <Statistic text="Total" value={total} />
            <Statistic text="Average" value={average} />
            <Statistic text="Positive" value={positive} />
            </tbody>
        </table>
        </div>
    );
}

export default StatViewer