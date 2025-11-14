// src/types/clerk.ts
export interface UserPublicMetadata {
  role?: 'admin' | 'user';
 
}

export interface ClerkUser {
  id: string;
  emailAddresses: Array<{
    emailAddress: string;
    id: string;
  }>;
  publicMetadata: UserPublicMetadata;
  firstName?: string | null;
  lastName?: string | null;
  imageUrl?: string;
  
}

export interface ClerkAuthObject {
  userId: string | null;
  user: ClerkUser | null;
  sessionId: string | null;
  redirectToSignIn: (options?: { returnBackUrl?: string }) => Response;
  protect: () => Promise<void>;
}