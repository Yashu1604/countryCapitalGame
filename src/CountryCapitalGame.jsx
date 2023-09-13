import React, { useState, useEffect, useRef } from "react";

const shuffleArray = (array) => {
  const shuffledArray = array
    .flat(1)
    .map((value) => ({ value, sort: Math.random() + Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  return shuffledArray;
};

const defaultRefValues = {
  firstClickVal: "",
  firstClickInd: "",
  secondClickVal: "",
  secondClickInd: "",
  click: 0,
};

const CountryCapitalGame = ({ data }) => {
  const [arr, setArr] = useState(shuffleArray(Object.entries(data)));
  const placesClicked = useRef(defaultRefValues);
  const [toggle, setToggle] = useState("");

  useEffect(() => {
    placesClicked.current = defaultRefValues;
  }, [arr]);

  const handleClick = (place, index) => {
    if (placesClicked.current.firstClickVal == "") {
      setToggle("blue");
      placesClicked.current = {
        ...placesClicked.current,
        firstClickVal: place,
        firstClickInd: index,
        click: 1,
      };
    } else if (placesClicked.current.firstClickInd !== index) {
      if (
        placesClicked.current.secondClickVal == "" &&
        ((data[place] !== undefined &&
          data[place] === placesClicked.current.firstClickVal) ||
          (data[placesClicked.current.firstClickVal] !== undefined &&
            data[placesClicked.current.firstClickVal] === place))
      ) {
        setToggle("");
        setArr((oldValues) => {
          return oldValues.filter((oldValue) => {
            if (
              oldValue === place ||
              oldValue === placesClicked.current.firstClickVal
            ) {
              return false;
            }
            return true;
          });
        });
      } else {
        if (placesClicked.current.secondClickVal == "") {
          setToggle("red");
          placesClicked.current = {
            ...placesClicked.current,
            secondClickVal: place,
            secondClickInd: index,
            click: 2,
          };
        } else if (
          placesClicked.current.firstClickInd !== index &&
          placesClicked.current.secondClickInd !== index
        ) {
          setToggle("blue");
          placesClicked.current = {
            ...defaultRefValues,
            firstClickVal: place,
            firstClickInd: index,
            click: 1,
          };
        }
      }
    }
  };

  return (
    <div>
      <h2>Countries and Capitals</h2>
      {arr.map((place, index) => (
        <button
          key={place}
          onClick={() => handleClick(place, index)}
          style={
            toggle === "blue" && index === placesClicked.current.firstClickInd
              ? { background: "blue" }
              : toggle === "red" &&
                (index === placesClicked.current.firstClickInd ||
                  index === placesClicked.current.secondClickInd)
              ? { background: "red" }
              : {}
          }
        >
          {place}
        </button>
      ))}
    </div>
  );
};

export default CountryCapitalGame;
