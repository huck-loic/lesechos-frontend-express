import React from "react";
import Button from "../Button";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toggleFollow } from "../../../../shared/services/follow/mutations";

type NewsletterButtonProps = {
  hasSubscription: boolean;
};

export default function NewsletterButton({ hasSubscription }: NewsletterButtonProps) {
  const [follow, setFollow] = useState(false);

  const mutation = useMutation({
    mutationFn: (currentFollow: boolean) => toggleFollow(currentFollow),
    onSuccess: (data) => {
      setFollow(data);
    },
    onError: () => {
      // TODO: better error message, ex: toast
      alert("Erreur inconnue lors de l'inscription");
    },
  });

  function handleFollow() {
    if (mutation.isPending) {
      return;
    }

    if (!hasSubscription) {
      // TODO: Replace with a polymophic button/link
      window.location.href = "https://abonnement.lesechos.fr/";
      return;
    }

    mutation.mutate(follow);
  }

  // TODO: Refactor to be more readable
  const label = follow ? "Se désincrire" : hasSubscription ? "S'inscrire" : "S'abonner";
  const intent = mutation.isPending ? undefined : follow ? "unfollow" : hasSubscription ? "follow" : "subscribe";

  return (
    <Button onClick={handleFollow} intent={intent} isLoading={mutation.isPending}>
      {label}
    </Button>
  );
}
