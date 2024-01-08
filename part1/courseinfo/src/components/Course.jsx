import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = (props) => {

    const course = props.course

    return(
        <div>
            <Header header={course.name}/>
            <Content content={course.parts}/>
            <Total content={course.parts}/>
        </div>            
    );
}

export default Course