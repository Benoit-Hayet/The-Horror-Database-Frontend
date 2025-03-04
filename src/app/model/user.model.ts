export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatarUrl: string;
  birthdate: string; // Vous pouvez utiliser `Date` si nécessaire.
  createdAt: string | null; // Peut être null.
  role: string[]; // Tableau de chaînes pour les rôles utilisateur.
  username: string;
}
