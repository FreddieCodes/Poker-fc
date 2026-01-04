import { hand, isStraight } from '../texas-holdem.js';

describe("hand", () => {
  // Test cases for the hand function
  it("should return early if community cards are not valid", () => {
    let expResult = "communityCards is not valid";
    expect(hand(["K♠", "A♦"], ["J♣", "Q♥", "9♥", "2♥"])).toBe(expResult);
  });

  it("should return early if hole cards are not valid", () => {
    let expResult = "holeCards is not valid";
    expect(hand(["K♠", "A8"], ["J♣", "Q♥", "9♥", "2♥", "3♦"])).toBe(expResult);
  });

  it("should return correctly if the type is nothing", () => {
    let expResult = { type: "nothing", ranks: ["A", "K", "Q", "J", "9"] };
    expect(hand(["K♠", "A♦"], ["J♣", "Q♥", "9♥", "2♥", "3♦"])).toEqual(
      expResult
    );
  });

  // it should return correctly if the type is straight-flush
  it("should return correctly if the type is straight-flush", () => {
    let expResult = {
      type: "straight-flush",
      ranks: ["A", "K", "Q", "J", "10"],
    };
    expect(hand(["K♠", "A♠"], ["J♠", "Q♠", "10♠", "2♥", "3♦"])).toEqual(
      expResult
    );
  });

  // it should return correctly if the type is four of a kind
  it("should return correctly if the type is four-of-a-kind", () => {
    let expResult = { type: "four-of-a-kind", ranks: ["2", "3"] };
    expect(hand(["2♠", "3♦"], ["2♣", "2♥", "3♠", "3♥", "2♦"])).toEqual(
      expResult
    );
  });

  // it should return correctly if the type is full house
  it("should return correctly if the type is full house", () => {
    let expResult = { type: "full house", ranks: ["K", "A"] };
    expect(hand(["K♠", "A♠"], ["K♣", "K♥", "A♥", "Q♥", "3♦"])).toEqual(
      expResult
    );
  });

  it("should return correctly if the type is full house", () => {
    let expResult = { type: "full house", ranks: ["3", "K"] };
    expect(hand(["3♠", "3♣"], ["K♣", "K♥", "3♥", "Q♥", "A♦"])).toEqual(
      expResult
    );
  });

  // it should return correctly if the type is flush
  it("should return correctly if the type is flush", () => {
    let expResult = { type: "flush", ranks: ["A", "K", "Q", "J", "3"] };
    expect(hand(["K♠", "A♠"], ["J♠", "Q♠", "10♥", "2♥", "3♠"])).toEqual(
      expResult
    );
  });

  // it should return correctly if the type is straight
  it("should return correctly if the type is straight", () => {
    let expResult = { type: "straight", ranks: ["A", "K", "Q", "J", "10"] };
    expect(hand(["K♥", "A♠"], ["J♠", "Q♠", "10♥", "2♥", "3♠"])).toEqual(
      expResult
    );
  });

  it("should return correctly if the type is straight and a wheel", () => {
    let expResult = { type: "straight", ranks: ["5", "4", "3", "2", "A"] };
    expect(hand(["5♥", "A♠"], ["4♠", "Q♠", "10♥", "2♥", "3♠"])).toEqual(
      expResult
    );
  });

  // it should return correctly if the type is three-of-a-kind
  it("should return correctly if the type is three-of-a-kind", () => {
    let expResult = { type: "three-of-a-kind", ranks: ["Q", "J", "9"] };
    expect(hand(["4♠", "9♦"], ["J♣", "Q♥", "Q♠", "2♥", "Q♦"])).toEqual(
      expResult
    );
  });

  // it should return correctly if the type is two pair
  it("should return correctly if the type is two pair", () => {
    let expResult = { type:'two pair', ranks:['K','J','9'] };
    expect(hand(['K♠','J♦'], ['J♣','K♥','9♥','2♥','3♦'])).toEqual(
      expResult
    )
  })
  
  // it should return correctly if the type is pair
  it("should return correctly if the type is pair", () => {
    let expResult = { type: "pair", ranks: ["Q", "K", "J", "9"] };
    expect(hand(["K♠", "Q♦"], ["J♣", "Q♥", "9♥", "2♥", "3♦"])).toEqual(
      expResult
    );
  });
})
