"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BI = void 0;
exports.isBIish = isBIish;
exports.toJSBI = toJSBI;

var _jsbi = _interopRequireDefault(require("jsbi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isBIish(value) {
  return value !== null && (typeof value === "number" && value % 1 === 0 || typeof value === "string" && (!!value.match(/^0x(0|[0-9a-fA-F]+)$/) || !!value.match(/^-?[0-9]+$/)) || typeof value === "bigint" || BI.isBI(value));
}

class BI {
  constructor(value) {
    this.jsbi = value;
    this._isBI = true;
  }

  add(other) {
    return toBI(_jsbi.default.add(this.jsbi, toJSBI(other)));
  }

  sub(other) {
    return toBI(_jsbi.default.subtract(this.jsbi, toJSBI(other)));
  }

  div(other) {
    return toBI(_jsbi.default.divide(this.jsbi, toJSBI(other)));
  }

  mul(other) {
    return toBI(_jsbi.default.multiply(this.jsbi, toJSBI(other)));
  }

  mod(other) {
    return toBI(_jsbi.default.remainder(this.jsbi, toJSBI(other)));
  }

  abs() {
    if (_jsbi.default.greaterThanOrEqual(this.jsbi, toJSBI(0))) {
      return toBI(this.jsbi);
    } else {
      return toBI(_jsbi.default.unaryMinus(this.jsbi));
    }
  }

  pow(other) {
    return toBI(_jsbi.default.exponentiate(this.jsbi, toJSBI(other)));
  }

  and(other) {
    return toBI(_jsbi.default.bitwiseAnd(this.jsbi, toJSBI(other)));
  }

  or(other) {
    return toBI(_jsbi.default.bitwiseOr(this.jsbi, toJSBI(other)));
  }

  xor(other) {
    return toBI(_jsbi.default.bitwiseXor(this.jsbi, toJSBI(other)));
  }

  not() {
    return toBI(_jsbi.default.bitwiseNot(this.jsbi));
  }

  mask(other) {
    const jsbiOther = toJSBI(other);

    if (_jsbi.default.lessThan(jsbiOther, toJSBI(0)) || _jsbi.default.lessThan(this.jsbi, toJSBI(0))) {
      throw new Error("mask works only with positive numbers");
    }

    const length = toJSBI(this.jsbi.toString(2).length);

    if (_jsbi.default.lessThanOrEqual(length, jsbiOther)) {
      return toBI(this.jsbi);
    } else {
      const maskNum = _jsbi.default.leftShift(_jsbi.default.signedRightShift(this.jsbi, jsbiOther), jsbiOther);

      return toBI(_jsbi.default.bitwiseXor(this.jsbi, maskNum));
    }
  }

  shl(other) {
    return toBI(_jsbi.default.leftShift(this.jsbi, toJSBI(other)));
  }

  shr(other) {
    return toBI(_jsbi.default.signedRightShift(this.jsbi, toJSBI(other)));
  }

  eq(other) {
    return _jsbi.default.equal(this.jsbi, toJSBI(other));
  }

  lt(other) {
    return _jsbi.default.lessThan(this.jsbi, toJSBI(other));
  }

  lte(other) {
    return _jsbi.default.lessThanOrEqual(this.jsbi, toJSBI(other));
  }

  gt(other) {
    return _jsbi.default.greaterThan(this.jsbi, toJSBI(other));
  }

  gte(other) {
    return _jsbi.default.greaterThanOrEqual(this.jsbi, toJSBI(other));
  }

  isNegative() {
    return _jsbi.default.lessThan(this.jsbi, toJSBI(0));
  }

  isZero() {
    return _jsbi.default.equal(this.jsbi, toJSBI(0));
  }

  toNumber() {
    return _jsbi.default.toNumber(this.jsbi);
  }

  toBigInt() {
    try {
      return BigInt(this.jsbi.toString(10));
    } catch (e) {
      throw new Error("this platform does not support BigInt");
    }
  }

  toString(radix) {
    radix = radix || 10;
    return this.jsbi.toString(radix);
  }

  toHexString() {
    if (_jsbi.default.lessThan(this.jsbi, toJSBI(0))) {
      return "-0x" + _jsbi.default.unaryMinus(this.jsbi).toString(16);
    } else {
      return "0x" + this.jsbi.toString(16);
    }
  }

  static from(value) {
    if (value instanceof BI) {
      return value;
    } else if (isBIish(value)) {
      return toBI(toJSBI(value));
    } else if (value instanceof _jsbi.default) {
      return toBI(toJSBI(value.toString()));
    } else {
      throw new Error(`invalid type: ${value} can't be converted into BI`);
    }
  }

  static isBI(value) {
    return isBILike(value) && !!value._isBI;
  }

}

exports.BI = BI;

function isBILike(value) {
  if (value == null) return false;
  return typeof value === "object";
}

function toBI(value) {
  return new BI(value);
}

function toJSBI(value) {
  if (typeof value === "number" || typeof value === "string") {
    return _jsbi.default.BigInt(value);
  } else {
    return _jsbi.default.BigInt(value.toString());
  }
}
//# sourceMappingURL=index.js.map