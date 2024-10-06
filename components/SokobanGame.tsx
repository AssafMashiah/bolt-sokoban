'use client'

import React, { useState, useEffect } from 'react';
import { levels } from '@/lib/levels';
import { LucideBox, LucideCircle, LucideSquare } from 'lucide-react';

type Position = {
  x: number;
  y: number;
};

const TILE_SIZE = 40;

const SokobanGame: React.FC = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [playerPosition, setPlayerPosition] = useState<Position>({ x: 0, y: 0 });
  const [boxPositions, setBoxPositions] = useState<Position[]>([]);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    initializeLevel(currentLevel);
  }, [currentLevel]);

  const initializeLevel = (levelIndex: number) => {
    const level = levels[levelIndex];
    let newPlayerPosition = { x: 0, y: 0 };
    let newBoxPositions: Position[] = [];

    level.forEach((row, y) => {
      for (let x = 0; x < row.length; x++) {
        const cell = row[x];
        if (cell === '@') {
          newPlayerPosition = { x, y };
        } else if (cell === '$') {
          newBoxPositions.push({ x, y });
        }
      }
    });

    setPlayerPosition(newPlayerPosition);
    setBoxPositions(newBoxPositions);
    setGameWon(false);
  };

  const movePlayer = (dx: number, dy: number, level: string[]) => {
    const newPosition = { x: playerPosition.x + dx, y: playerPosition.y + dy };

    if (isValidMove(newPosition, level)) {
      const boxIndex = boxPositions.findIndex(
        (box) => box.x === newPosition.x && box.y === newPosition.y
      );

      if (boxIndex !== -1) {
        const newBoxPosition = { x: newPosition.x + dx, y: newPosition.y + dy };
        if (isValidMove(newBoxPosition, level)) {
          const newBoxPositions = [...boxPositions];
          newBoxPositions[boxIndex] = newBoxPosition;
          setBoxPositions(newBoxPositions);
          setPlayerPosition(newPosition);
          checkWinCondition(newBoxPositions, level);
        }
      } else {
        setPlayerPosition(newPosition);
      }
    }
  };

  const isValidMove = (position: Position, level: string[]): boolean => {
    return (
      position.y >= 0 &&
      position.y < level.length &&
      position.x >= 0 &&
      position.x < level[position.y].length &&
      level[position.y][position.x] !== '#'
    );
  };

  const checkWinCondition = (boxes: Position[], level: string[]) => {
    const allBoxesOnGoal = boxes.every(
      (box) => level[box.y][box.x] === '.'
    );
    if (allBoxesOnGoal) {
      setGameWon(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (gameWon) return;

    const level = levels[currentLevel];
    switch (e.key) {
      case 'ArrowUp':
        movePlayer(0, -1, level);
        break;
      case 'ArrowDown':
        movePlayer(0, 1, level);
        break;
      case 'ArrowLeft':
        movePlayer(-1, 0, level);
        break;
      case 'ArrowRight':
        movePlayer(1, 0, level);
        break;
    }
  };

  const renderTile = (x: number, y: number) => {
    const level = levels[currentLevel];
    const isPlayer = playerPosition.x === x && playerPosition.y === y;
    const isBox = boxPositions.some((box) => box.x === x && box.y === y);
    const isWall = level[y][x] === '#';
    const isGoal = level[y][x] === '.';

    if (isPlayer) {
      return <LucideCircle className="text-blue-500" />;
    } else if (isBox) {
      return <LucideBox className="text-yellow-500" />;
    } else if (isWall) {
      return <LucideSquare className="text-gray-700" />;
    } else if (isGoal) {
      return <div className="w-3 h-3 bg-red-500 rounded-full" />;
    }
    return null;
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <h1 className="text-4xl font-bold mb-4">Sokoban</h1>
      <div className="bg-white p-4 rounded shadow-lg">
        {levels[currentLevel].map((row, y) => (
          <div key={y} className="flex">
            {row.split('').map((_, x) => (
              <div
                key={`${x}-${y}`}
                className="w-10 h-10 flex items-center justify-center"
              >
                {renderTile(x, y)}
              </div>
            ))}
          </div>
        ))}
      </div>
      {gameWon && (
        <div className="mt-4 text-2xl font-bold text-green-500">
          Level Complete!
        </div>
      )}
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => setCurrentLevel((prev) => (prev + 1) % levels.length)}
      >
        Next Level
      </button>
    </div>
  );
};

export default SokobanGame;