import { css } from "@emotion/react";
import HashLoader from "react-spinners/HashLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Loader = ({ size, loading, color }) => {


    return (
        <div className="sweet-loading">
            <HashLoader size={size} loading={loading} color={color} margin={2} css={override} />
        </div>
    );
}

export default Loader;


