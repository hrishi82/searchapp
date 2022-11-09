import { useState, useEffect } from "react";

export const searchFilter = (userData, stringToMatch) => {
  return userData.filter((user) => {
    let userPropertyArr = Object.keys(user);

    for (let keyElement of userPropertyArr) {
      if (Array.isArray(user[keyElement])) {
        let found = user[keyElement].some((el) =>
          el?.toLowerCase().includes(stringToMatch?.toLowerCase())
        );
        if(found){
          return true
        }

      } else if (typeof user[keyElement] === "string") {
        let found = user[keyElement]
          ?.toLowerCase()
          .includes(stringToMatch?.toLowerCase());
          if(found){
            return true
          }
      }
    }
    return false;
  });
};

export const useKeyPress = function (targetKey) {
  const [keyPressed, setKeyPressed] = useState(false);

  const downHandler = ({ key }) => {
    if (key === targetKey) {
      // document.body.style.pointerEvents = 'none';
      setKeyPressed(true);
    }
  };

  const upHandler = ({ key }) => {
    if (key === targetKey) {
      // document.body.style.pointerEvents = 'auto';
      setKeyPressed(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [targetKey]);

  return keyPressed;
};
