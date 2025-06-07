import { NO_DATA_FOUND } from "../constants/Constants";
const Alertmodal = ({ fees }) => {
    return (
        <div class={typeof fees === 'number' ? "alert alert-primary" : "alert alert-danger"} role="alert">
            {typeof fees === 'number' ? `₹${fees}` : NO_DATA_FOUND}
        </div>
    )
}
export default Alertmodal;

