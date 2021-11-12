import { useState } from "react";
import classes from "./app.module.css";
import Button from "./componenets/atoms/Button/Button";
import MainFactory, { EFactoryTypes } from "./factory/MainFactory";


function App() {

  const [ type, setType ] = useState(EFactoryTypes.TManageUsers);

  const changetoManageUsers = () => {
    setType(EFactoryTypes.TManageUsers);
  }

  const changetoSomeOtherContent = () => {
    setType(EFactoryTypes.TSomeOtherContent);
  }

  return (
    <div className={classes.container}>
      <div className={classes.buttons}>
        <Button 
          value="Manage Users" 
          onClick={changetoManageUsers}
          />

        <Button 
          value="Some other content"
          onClick={changetoSomeOtherContent}
          />
      </div>

      <MainFactory type={type}/>
    </div>
  );
}

export default App;
