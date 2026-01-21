import React, { createContext, useContext, useMemo, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// --- TYPES ---
export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  whatsapp: string;
  avatar: string;
  memberType: 'Particulier' | 'Pro';
  // Fix: Add missing city property to UserProfile interface to resolve error in SettingsTab
  city: string;
}

interface UserContextType {
  user: UserProfile | undefined;
  isLoading: boolean;
  isError: boolean;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  isUpdating: boolean;
}

// --- MOCK API ---
const MOCK_USER: UserProfile = {
  id: 'usr_123',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@email.com',
  phone: '22 123 456',
  whatsapp: '22 123 456',
  avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
  memberType: 'Particulier',
  // Fix: Add missing city property to MOCK_USER object
  city: 'Tunis'
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode; isLoggedIn: boolean }> = ({ children, isLoggedIn }) => {
  const queryClient = useQueryClient();

  // Récupération du profil via React Query pour le cache global
  const { data: user, isLoading, isError } = useQuery<UserProfile>({
    queryKey: ['user_profile'],
    queryFn: async () => {
      await new Promise(r => setTimeout(r, 600)); // Simulation réseau
      return MOCK_USER;
    },
    enabled: isLoggedIn,
    staleTime: Infinity,
  });

  // Mutation centralisée pour la mise à jour du profil
  const updateMutation = useMutation({
    mutationFn: async (newData: Partial<UserProfile>) => {
      await new Promise(r => setTimeout(r, 1200));
      return { ...user, ...newData } as UserProfile;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['user_profile'], data);
    },
  });

  const updateProfile = useCallback(async (data: Partial<UserProfile>) => {
    await updateMutation.mutateAsync(data);
  }, [updateMutation]);

  const value = useMemo(() => ({
    user,
    isLoading,
    isError,
    updateProfile,
    isUpdating: updateMutation.isPending
  }), [user, isLoading, isError, updateProfile, updateMutation.isPending]);

  return (
    <div id="user-context-root">
      <UserContext.Provider value={value}>
        {children}
      </UserContext.Provider>
    </div>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};