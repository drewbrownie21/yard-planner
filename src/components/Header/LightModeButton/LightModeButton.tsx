import { Button } from "../../Button/Button";
import { LightModeContext } from "../../../context/ThemeContext";
import { useContext, useState } from "react";

export function LightModeButton() {
    const lightMode = useContext(LightModeContext);
    
  return(
    <Button buttonDisplayText="Light Mode" onClick={() => !lightMode}/>
  )
}
