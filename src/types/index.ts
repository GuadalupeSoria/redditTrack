// src/types/index.ts
export interface User {
  id: string;
  name: string;
  dailyRecords: Record<string, DailyRecord>;
}

export interface DailyRecord {
  date: string;
  posts: PostRecord[]; // Ahora centrado en un post específico
}

// src/types/index.ts
export interface PostRecord {
  title: string;
  subreddit: string;
  views: number;
  upvotes: number;
  comments: number;
  lastChecked: string;
  completed: boolean;
  image?: string; // Ahora incluimos la propiedad image opcional
}


