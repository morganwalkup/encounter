/**
 * Calculates the modifier for a particular ability score value
 * @param abilityScore: a character's ability score value
 */
export function calculateModifier(abilityScore) {
  let modifier = Math.floor((abilityScore - 10) / 2);
  if(modifier >= 0) {
    modifier = ("+" + modifier);
  }
  return modifier;
}