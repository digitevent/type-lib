import { expectType, expectAssignable, expectNotAssignable, expectError } from 'tsd'

import { Nominal, nominal } from './nominal'

type NominalString = Nominal<string, 'S'>

// We can create a nominal string from a string
expectType<NominalString>(nominal<NominalString>('foo'))

// Must pass a value of the internal type
expectError<NominalString>(nominal<NominalString>(123))

// Unbranded string is not assignable to a nominal string
expectNotAssignable<NominalString>('foo')

// Branded string is assignable to a nominal string
expectAssignable<NominalString>('foo' as NominalString)
