import React from 'react';
import { Button } from 'antd';
import { useAppSelector, useAppDispatch } from '../store';
import { decrement, increment } from '../store/counter';

export const Counter = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div>
        <Button
          aria-label="Increment value"
          onClick={() => {
            dispatch(increment());
            window.Main.sendMessage('Counter: increment');
          }}
        >
          Increment
        </Button>
        <span>{` ${count} `}</span>
        <Button
          aria-label="Decrement value"
          onClick={() => {
            dispatch(decrement())
            window.Main.sendMessage('Counter: decrement');
          }}
        >
          Decrement
        </Button>
      </div>
    </div>
  );
};
