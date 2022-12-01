import { Nominal, nominal } from './nominal'

type S = Nominal<string, 'S'>
type O = Nominal<Record<string, unknown>, 'O'>

describe('Nominal', () => {
  describe('the nominal type has the same structure as the internal type at runtime', () => {
    it('primitive types', () => {
      const v = "I'm a string"
      const n = nominal<S>(v)
      expect(n).toBe(v)
    })

    it('object types', () => {
      const v = { a: 1, b: 2 }
      const n = nominal<O>(v)
      expect(n).toEqual(v)
    })
  })

  it('the brand has no value at runtime (zero cost)', () => {
    const v = "I'm a string"
    const n = nominal<S>(v)
    const symbol = findBrandSymbol(n)
    expect(symbol).toBeUndefined()
  })
})

function findBrandSymbol(obj: unknown): unknown {
  return Object.getOwnPropertySymbols(obj).find((s) => s.toString() === 'Symbol(__brand)')
}
