import { randomBetween } from "../../utils/random";
import { wait } from "../../utils/wait";

export async function toggleFollow(followState: boolean) {
  // TODO: Mutate and return state
  await wait(randomBetween(1000, 3000));

  if (1 > randomBetween(0, 10)) {
    // Simule 10% d'echec
    throw new Error("Erreur inconnue lors de l'inscription");
  }

  return !followState;
}
