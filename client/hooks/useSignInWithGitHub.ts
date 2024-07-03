import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { signInWithPopup, GithubAuthProvider } from 'firebase/auth';

import { auth } from '@/firebase/firebaseConfig';

type GoogleAuthResult = {
  token: string | undefined;
};

export const useGithubAuthMutation = (): UseMutationResult<
  GoogleAuthResult,
  Error,
  void,
  unknown
> => {
  return useMutation<GoogleAuthResult, Error, void>({
    mutationFn: async () => {
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await result.user.getIdToken();

      return { user, token };
    },
  });
};
