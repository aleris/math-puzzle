import {Random} from './Random'

describe('Random', () => {
  const testInterval = (from: number, to: number) => {
    const results = Array.from({length: 100})
    for (let i = 0; i !== 100; i++) {
      const result = Random.interval(from, to)
      expect(result).toBeGreaterThanOrEqual(from)
      expect(result).toBeLessThanOrEqual(to)
      results[i] = result
    }
    for (let i = from; i <= to; i++) {
      expect(results.some(r => r === i)).toStrictEqual(true)
    }
  }

  test('interval small', () => {
    testInterval(4, 7)
  })

  test('interval same', () => {
    testInterval(4, 4)
  })

  test('interval single', () => {
    testInterval(4, 5)
  })

  test('flip', () => {
    const results = Array.from({length: 100})
    for (let i = 0; i !== 1000; i++) {
      results[i] = Random.flip()
    }
    const countTrue = results.filter(r => r).length
    expect(countTrue).toBeGreaterThan(400)
    expect(countTrue).toBeLessThan(600)
  })

  test('slice', () => {
    const list = ['a', 'b', 'c']
    const result = Random.slice(list, 3, 'X')
    expect(result).toHaveLength(3)
    result.filter(item => item !== 'X').forEach(item => expect(list).toContain(item))
    expect(result).toContain('X')
  })

  test('slice with too few items returns available', () => {
    const list = ['a', 'b']
    const result = Random.slice(list, 4, 'X')
    expect(result).toHaveLength(3)
    result.filter(item => item !== 'X').forEach(item => expect(list).toContain(item))
    expect(result).toContain('X')
  })
})
