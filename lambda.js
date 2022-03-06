Number.prototype.log = function (label = '') { console.info(label, this) }
Function.prototype.log = function (label = '') { console.info(label, this) }

;(1).log('// I ===================================')
let r

const I = a => a

r = I(3)

r = I(I)

r.log('I')
r(20).log('I')

// ======================================
;(2).log('// SELF ===================================')

const SELF = f => f(f)
r = SELF(I)

const FIRST = a => _ => a

FIRST.log('FIRST f')

r = FIRST(3)
r(20).log('FIRST R(20)')

const LAST = _ => b => b

LAST.log('LAST')
r = LAST(2)

r(20).log('LAST R(20)')

// ======================================
;(3).log('// FLIP ===================================')

const FLIP = f => a => b => f(b)(a)

const LAST_FLIP = a => b => FLIP(FIRST)(a)(b)

LAST_FLIP.log('LAST_FLIP')

r = LAST_FLIP(20)(30)

r.log('LAST_FLIP R')

// ======================================
;(4).log('// NOT ===================================')

// LOGIC: NOT OPERATOR
const T = FIRST; // boolean TRUE
const F = LAST; // boolean FALSE

const NOT = f => f(F)(T)

NOT.log('NOT')

NOT(T).log('NOT(T)')
NOT(F).log('NOT(F)')

// ======================================
;(5).log('// AND ===================================')

// LOGIC: AND OPERATOR
const AND = a => b => a(b)(F)

AND.log('AND')

AND(T)(T).log('AND(T)(T)')
AND(F)(T).log('AND(F)(T)')
AND(T)(F).log('AND(T)(F)')
AND(F)(F).log('AND(F)(F)');

// ======================================
;(6).log('// OR ===================================')

// LOGIC: OR OPERATOR
const OR = a => b => a(T)(b)

OR(T)(T).log('OR(T)(T)')
OR(F)(T).log('OR(F)(T)')
OR(T)(F).log('OR(T)(F)')
OR(F)(F).log('OR(F)(F)')

// ======================================
;(7).log('// EQ ===================================')

// LOGIC: EQ OPERATOR
const EQ = a => b => a(b)(NOT(b))

EQ(T)(T).log('EQ(T)(T)')
EQ(F)(T).log('EQ(F)(T)')
EQ(T)(F).log('EQ(T)(F)')
EQ(F)(F).log('EQ(F)(F)')

// ======================================
;(8).log('// XOR ===================================')

// LOGIC: XOR OPERATOR
// const XOR = a => b => a(NOT(b))(b)
const XOR = a => b => NOT(EQ(a)(b))

XOR(T)(T).log('XOR(T)(T)')
XOR(F)(T).log('XOR(F)(T)')
XOR(T)(F).log('XOR(T)(F)')
XOR(F)(F).log('XOR(F)(F)')