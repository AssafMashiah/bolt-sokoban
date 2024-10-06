'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react';

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

type Entity = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type Alien = Entity & {
  direction: number;
};

const SpaceInvadersGame: React.FC = () => {
  const [player, setPlayer] = useState<Entity>({ x: GAME_WIDTH / 2 - 25, y: GAME_HEIGHT - 60, width: 50, height: 30 });
  const