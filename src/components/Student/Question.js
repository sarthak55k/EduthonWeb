import React from "react";
import "../../css/Student/Questions.css";

const Question = (props) => {

  let progressStyle = `${props.progress}%`;
  return (
    <div>
     {/* <p className="progress-status"> Progress Status: </p>{" "}
      <div id="myProgress">
        <div id="myBar" style={{ width: progressStyle }}>
          {Math.round((props.answered / props.total) * 100)}%
        </div>
  </div>*/}
      <div>
        <div className="total-quests">
          <p> Total number of questions = {props.total} </p>{" "}
        </div>{" "}
        <div className="ans-quests">
          <p>
            Number of questions answered = {props.answered}{" "}
          </p>{" "}
        </div>{" "}
      </div>{" "}
      <br />
      <div>
        <div>
          <div className="question">
          <p className="quest-font"> {props.question} </p>{" "}
          </div>
          <br />
          <div>
            <ul className="quest-options">
              {props.ops.map((val, index) => {
                return (
                  <li key={"Option" + index}>
                    <input
                      key={"Option" + index}
                      type="radio"
                      id={"Option" + index}
                      name="selector"
                      value={val.option}
                      onClick={(e) => props.handleOptionClick(index)}
                    />
                    <label htmlFor={"Option" + index} className="opt-quest">{val.option}</label>

                    <div className=""></div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>{" "}
      </div>{" "}
      <br />
        <br />
        <br />
        <br />
      <div className="btn-quest">
        <div className="back-btn">
          <button
            type="submit"
            className=" button-quest"
            onClick={props.handleBack}
            disabled={props.index === 0 ? true : false}
          >
            Back{" "}
          </button>{" "}
        </div>{" "}
        <div className="submit-btn">
          <button
            type="submit"
            className="button-quest"
            onClick={props.handleSubmit}
            disabled={props.total === props.answered ? false : true}
          >
            Submit{" "}
          </button>{" "}
      </div>{" "}
        <div className="next-btn">
          <button
            type="submit"
            className="button-quest"
            onClick={props.handleNext}
            disabled={props.index === props.total - 1 ? true : false}
          >
            Next
          </button>{" "}
        </div>{" "}
        </div>
    </div>
  );
};

export default Question;