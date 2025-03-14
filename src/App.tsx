import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';
import cn from 'classnames';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortType {
  Default = '',
  Alphabetically = 'alphabetically',
  ByLength = 'by length',
}

const getPreparedGoods = (
  goods: string[],
  { sortField, reverse }: { sortField: string; reverse: boolean },
): string[] => {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.Alphabetically:
          return good1.localeCompare(good2);
        case SortType.ByLength:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App = () => {
  const [sortField, setSortField] = useState<sortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);

  const readyGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    reverse: isReversed,
  });
  const handleSortAlphabetically = () => setSortField(SortType.Alphabetically);
  const handleSortByLength = () => setSortField(SortType.ByLength);
  const handleReverse = () => setIsReversed(!isReversed);
  const handleReset = () => {
    setSortField('');
    setIsReversed(false);
  };

  const isResetNeeded = sortField || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.Alphabetically,
          })}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.ByLength,
          })}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': isReversed === false,
          })}
          onClick={handleReverse}
        >
          Reverse
        </button>
        {isResetNeeded && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        {readyGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
