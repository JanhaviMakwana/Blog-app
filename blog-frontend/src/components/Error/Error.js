import { withState } from "../../blog-context";
import { REMOVE_ERROR } from '../../store/actionTypes';

const Error = (props) => {

    const backHandler = () => {
        props.dispatch({ type: REMOVE_ERROR });
    };
    return (
        <div className="error" onClick={backHandler}>
            <p>{props.state.error}</p>
        </div>
    );
};
export default withState(Error)