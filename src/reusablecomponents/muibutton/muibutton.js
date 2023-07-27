import { Button } from "@mui/material";

const ButtonMUI = ({name,bg,color,handler,type}) => {
    
    return (
        <Button type={type} variant="contained" style={{backgroundColor:{bg},color:{color}}} onClick={handler}  >{name}</Button>
    )
}

export default ButtonMUI;