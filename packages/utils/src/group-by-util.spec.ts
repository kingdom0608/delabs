import { groupBy } from './group-by-util';

describe('groupBy', function () {
  const testArray = [
    {
      type: 'Dog',
      name: 'Spot'
    },
    {
      type: 'Cat',
      name: 'Tiger'
    },
    {
      type: 'Dog',
      name: 'Rover'
    },
    {
      type: 'Cat',
      name: 'Leo'
    }
  ];

  it('groupBy - simple', function () {
    const result = groupBy(testArray, 'type');
    // console.log(result);
    expect(result).toEqual({
      Dog: [
        { type: 'Dog', name: 'Spot' },
        { type: 'Dog', name: 'Rover' }
      ],
      Cat: [
        { type: 'Cat', name: 'Tiger' },
        { type: 'Cat', name: 'Leo' }
      ]
    });
  });

  it('groupBy - iteratee', function () {
    const result = groupBy(testArray, function (item) {
      return item.name.length;
    });
    // console.log(result);
    expect(result).toEqual({
      '3': [{ type: 'Cat', name: 'Leo' }],
      '4': [{ type: 'Dog', name: 'Spot' }],
      '5': [
        { type: 'Cat', name: 'Tiger' },
        { type: 'Dog', name: 'Rover' }
      ]
    });
  });
});
