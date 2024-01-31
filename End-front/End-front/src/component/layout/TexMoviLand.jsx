import {useState} from "react";
import "../layout/tex.scss"; 

const NeonTextEffect = () => {
    const [text, setText] = useState(" Movie land");

    const handleTextChange = (e) => {
        setText(e.target.innerText);
    };

    return (
        <div className="text-effect">
            <div className="neonContainer">
                <h1
                    className="neon"
                    data-text={text}
                    contentEditable
                    onInput={handleTextChange}
                >
                    {text}
                </h1>
            </div>
            <div className="gradient"></div>
            <div className="spotlight"></div>
        </div>
    );
};

export default NeonTextEffect;
