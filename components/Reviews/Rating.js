import React from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { IconContext } from "react-icons/lib";

const Rating = ({ value }) => {
  return (
    <div>
      <span>
        {value >= 1 ? (
          <IconContext.Provider>
            <BsStarFill />
          </IconContext.Provider>
        ) : value >= 0.5 ? (
          <IconContext.Provider>
            <BsStarHalf />
          </IconContext.Provider>
        ) : (
          <IconContext.Provider>
            <BsStar />
          </IconContext.Provider>
        )}
      </span>
      <span>
        {value >= 2 ? (
          <IconContext.Provider>
            <BsStarFill />
          </IconContext.Provider>
        ) : value >= 1.5 ? (
          <IconContext.Provider>
            <BsStarHalf />
          </IconContext.Provider>
        ) : (
          <IconContext.Provider>
            <BsStar />
          </IconContext.Provider>
        )}
      </span>
      <span>
        {value >= 3 ? (
          <IconContext.Provider>
            <BsStarFill />
          </IconContext.Provider>
        ) : value >= 2.5 ? (
          <IconContext.Provider>
            <BsStarHalf />
          </IconContext.Provider>
        ) : (
          <IconContext.Provider>
            <BsStar />
          </IconContext.Provider>
        )}
      </span>
      <span>
        {value >= 4 ? (
          <IconContext.Provider>
            <BsStarFill />
          </IconContext.Provider>
        ) : value >= 3.5 ? (
          <IconContext.Provider>
            <BsStarHalf />
          </IconContext.Provider>
        ) : (
          <IconContext.Provider>
            <BsStar />
          </IconContext.Provider>
        )}
      </span>
      <span>
        {value >= 5 ? (
          <IconContext.Provider>
            <BsStarFill />
          </IconContext.Provider>
        ) : value >= 4.5 ? (
          <IconContext.Provider>
            <BsStarHalf />
          </IconContext.Provider>
        ) : (
          <IconContext.Provider>
            <BsStar />
          </IconContext.Provider>
        )}
      </span>
    </div>
  );
};

export default Rating;
