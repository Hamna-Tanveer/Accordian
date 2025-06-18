import { useState } from "react";
import accordionData from "./accordionData";
import "../accordion/Styles.css";
export default function Accordion() {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [MultipleSelected, setMultipleSelected] = useState([]);
  {
    /*function for handling sigle selection */
  }
  const handleSingleSelection = (getCurrentId) => {
    setSelected(getCurrentId === selected ? null : getCurrentId);
  };
  {
    /*function for handling Multiple selection */
  }
  const handledMultiSelection = (getCurrentId) => {
    let copyMultipleSelected = [...MultipleSelected];
    const findIndexOfCurrentId = copyMultipleSelected.indexOf(getCurrentId);
    // console.log(findIndexOfCurrentId);
    console.log(findIndexOfCurrentId, MultipleSelected);
    if (findIndexOfCurrentId === -1) copyMultipleSelected.push(getCurrentId);
    else copyMultipleSelected.splice(findIndexOfCurrentId, 1);
    setMultipleSelected(copyMultipleSelected);
  };
  //console.log(selected);
  return (
    <div className="wrapper">
      {/*button for Multiple selection */}
      <button
        onClick={() => setEnableMultiSelection(!enableMultiSelection)}
        className="btn"
      >
        Enable Multi Selection
      </button>
      {/*To display the Data as Accordion */}
      <div className="accordion">
        {accordionData && accordionData.length > 0 ? (
          accordionData.map((dataItem, index) => (
            <div key={index} className="item">
              <div
                onClick={
                  enableMultiSelection
                    ? () => {
                        handledMultiSelection(dataItem.id);
                      }
                    : () => {
                        handleSingleSelection(dataItem.id);
                      }
                }
                className="title"
              >
                <h3>{dataItem.title}</h3>
                <span className="mark">+</span>
              </div>
              {enableMultiSelection
                ? MultipleSelected.indexOf(dataItem.id) !== -1 && (
                    <div className="content">{dataItem.content}</div>
                  )
                : selected === dataItem.id && (
                    <div className="content">{dataItem.content}</div>
                  )}
              {/*{selected === dataItem.id ? (
                <div className="content">{dataItem.content}</div>
              ) : null}*/}
            </div>
          ))
        ) : (
          <div>Data not Found!</div>
        )}
      </div>
    </div>
  );
}
