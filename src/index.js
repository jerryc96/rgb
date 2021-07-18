import { render } from '@testing-library/react';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {levels} from './level';
const clone = require('rfdc')();
// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <GameBoard />
  </React.StrictMode>,
  document.getElementById('root')
);

const colorTrigger = {
  'red': 'blue',
  'blue': 'green',
  'green': 'red'
}

function Block(props) {
  const color = props.color;
  const xpos = props.xpos;
  const ypos = props.ypos;

  const handleClick = () => {
    props.onBlockClicked(color, xpos, ypos);
  };
  return (
    <button disabled={props.isDisabled} className={"square " + props.color} onClick={handleClick}>
       
    </button>
  )
}

function GameBoard(props) {
  const [level, setLevel]= useState(0);
  const [levelMap, setLevelMap] = useState(clone(levels[level]['levelMap']));
  const [moveCount, setmoveCount] = useState(levels[0]['moves']);
  const [description, setDescription] = useState(levels[0]['description']);
  const [levelCleared, setLevelCleared] = useState(false);

  function onBlockClicked(color, xpos, ypos){
    if (moveCount > 0){
      const neighbours = findNeighbouringBlocks(xpos, ypos);
      setLevelMap(updateBlocks(neighbours, color));
      setmoveCount(moveCount - 1);
      evaluateVictory();
    }
    evaluateVictory();
  }

  /*
  creates the list of tuples representing the xpos and ypos of the block's neighbors.
  any block adjacent to or directly diagonal to the selected block is considered a neighbour.

  for example:
  NNN
  NXN  where X is the selected block
  NNN
  */
  function findNeighbouringBlocks(xpos, ypos){
    let neighbours = [];
    if (xpos > 0){
      neighbours.push([xpos - 1, ypos]);
      if (ypos > 0) {
        neighbours.push([xpos - 1, ypos - 1]);
      }
      if (ypos < levelMap[xpos].length - 1){
        neighbours.push([xpos - 1, ypos + 1]);
      }
    }
    if (xpos < levelMap.length - 1){
      neighbours.push([xpos + 1, ypos]);
      if (ypos > 0){
        neighbours.push([xpos + 1, ypos - 1]);
      }
      if (ypos < levelMap[xpos].length - 1){
        neighbours.push([xpos + 1, ypos + 1]);
      }
    }
    if (ypos > 0){
      neighbours.push([xpos, ypos - 1]);
    }
    if (ypos < levelMap[xpos].length - 1){
      neighbours.push([xpos, ypos + 1]);
    }
    return neighbours;
  }
  /*
  updates the targeted blocks based on the state of the selected block.

  for now, it only implements
  */
  function updateBlocks(targetedBlocks, color) {
    let levelMapCopy = [...levelMap];
    targetedBlocks.forEach((coord) => {
      // check the neighboring block's initial property against the selected block to see
      // if they can be affected
      const blockProperty = levelMap[coord[0]][coord[1]];
      if (colorTrigger[color] === blockProperty){
        levelMapCopy[coord[0]][coord[1]] = color;
      }
    });
    return levelMapCopy;
  }

  function evaluateVictory() {
    let colorMap = []
    levelMap.forEach((row) => {
      row.forEach((block) => {
        if (!(colorMap.includes(block))) {
          colorMap.push(block);
        } 
      })
    });
    if (colorMap.length === 1){
      setLevelCleared(true);
    }
  }

  function reset(){
    setLevelMap(clone(levels[level]['levelMap']));
    setmoveCount(levels[level]['moves']);
    setDescription(levels[level]['description']);
  }

  function prevLevel() {
    if (level > 0){
      setLevel(level-1);
      setLevelMap(clone(levels[level-1]['levelMap']));
      setmoveCount(levels[level-1]['moves']);
      setDescription(levels[level-1]['description']);
    }
    setLevelCleared(false);
  }

  function nextLevel(){
    if (level < levels.length - 1){
      setLevel(level+1);
      setLevelMap(clone(levels[level+1]['levelMap']));
      setmoveCount(levels[level+1]['moves']);
      setDescription(levels[level+1]['description']);
    }
    setLevelCleared(false);
  }
  return (
    <div>
      <div className="grid">
        <p className="description">
         {description}
        </p>
      </div>
      <div className="gameboard">
        {levelMap.map((row, x) => {
          return (
            <div className="row" key={x}>
            {
              row.map((col, y) => {
                return (
                  <Block key={y} color={col} xpos={x} ypos={y} onBlockClicked={onBlockClicked} isDisabled={levelCleared}></Block>
                )
              })
            }
          </div>
          )
        })}
      </div>
      <div className="row">
        <p>Moves Left: {moveCount}</p>
      </div>
      <p hidden={!levelCleared}>Level Complete!</p>
      <div>
        <button onClick={prevLevel}>
          Previous Level
        </button>
        <button onClick={reset}>
          Reset Level
        </button>
        <button onClick={nextLevel}>
          Next Level
        </button>
      </div>
 
    </div>
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
