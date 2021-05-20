export class Random {
  static interval(minInclusive: number, maxInclusive: number): number {
    return minInclusive + Math.round(Math.random() * (maxInclusive - minInclusive))
  }

  static flip(): boolean {
    return Math.random() < 0.5
  }

  static letterExcept(except: string, from: string = 'ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz') {
    let tryCount = 100
    do {
      tryCount--
      const listIndex = this.interval(0, from.length - 1)
      const word = from[listIndex]
      const letterIndex = this.interval(0, word.length - 1)
      const letter = word[letterIndex]
      if (except.indexOf(letter) === -1 || tryCount < 0) {
        return letter
      }
    } while (true)
  }

  /**
   * Extracts a slice of random items picked from a list, with an always included item.
   * @param list the list of items to pick from
   * @param maxLength the final maximum length of the list (can be smaller if not enough items)
   * @param included the always included item
   */
  static slice<T>(list: T[], maxLength: number, included: T): T[] {
    const remaining = [...list]
    const result: T[] = [included]
    while (result.length !== maxLength && 0 < remaining.length) {
      const index = this.interval(0, remaining.length - 1)
      const items = remaining.splice(index, 1)
      if (this.flip()) {
        result.push(...items)
      } else {
        result.unshift(...items)
      }
    }
    return result
  }
}
