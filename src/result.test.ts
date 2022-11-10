import { Err, isErr, isOk, Ok } from './result'

describe('Result', () => {
  describe('Ok', () => {
    it('Ok.isOk returns true', () => {
      expect(Ok(0).isOk()).toBe(true)
    })

    it('Ok.isErr returns false', () => {
      expect(Ok(0).isErr()).toBe(false)
    })

    it('Ok.unwrap returns the contained Ok value', () => {
      expect(Ok(0).unwrap()).toBe(0)
    })

    it('Ok.unwrapErr panics', () => {
      expect(() => Ok(0).unwrapErr()).toThrowError(ReferenceError)
    })
  })

  describe('Err', () => {
    it('Err.isOk returns false', () => {
      expect(Err(1).isOk()).toBe(false)
    })

    it('Err.isErr returns true', () => {
      expect(Err(1).isErr()).toBe(true)
    })

    it('Err.unwrap panics', () => {
      expect(() => Err(1).unwrap()).toThrowError(ReferenceError)
    })

    it('Err.unwrapErr returns the contained Err value', () => {
      expect(Err(1).unwrapErr()).toBe(1)
    })
  })

  describe('Narrow variants', () => {
    it('isOk', () => {
      expect(isOk(Ok(0))).toBe(true)
      expect(isOk(Err(1))).toBe(false)
    })

    it('isErr', () => {
      expect(isErr(Ok(0))).toBe(false)
      expect(isErr(Err(1))).toBe(true)
    })
  })
})
