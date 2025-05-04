// Local storage service to replace Supabase

interface User {
  id: string;
  email: string;
  username: string;
  user_metadata?: {
    username: string;
    learning_speed: string;
    preferred_learning_style: string;
    daily_goal: number;
  };
}

interface Session {
  user: User | null;
}

interface AuthChangeCallback {
  (event: string, session: Session | null): void;
}

class LocalStorageAuth {
  private currentUser: User | null = null;
  private listeners: AuthChangeCallback[] = [];
  private readonly USER_KEY = 'yungs_tech_user';
  private readonly SESSION_KEY = 'yungs_tech_session';

  constructor() {
    // Defer loading user until after initialization
    setTimeout(() => {
      this.loadUser();
    }, 0);
  }

  private loadUser() {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        console.warn('Browser localStorage not available');
        return;
      }
      
      const userJson = window.localStorage.getItem(this.USER_KEY);
      if (userJson) {
        try {
          this.currentUser = JSON.parse(userJson);
        } catch (e) {
          console.error('Failed to parse user from localStorage', e);
          this.currentUser = null;
        }
      }
    } catch (e) {
      console.error('Error accessing localStorage', e);
    }
  }

  private saveUser(user: User | null) {
    if (typeof window === 'undefined' || !window.localStorage) {
      console.warn('Browser localStorage not available');
      return;
    }
    
    if (user) {
      window.localStorage.setItem(this.USER_KEY, JSON.stringify(user));
      window.localStorage.setItem(this.SESSION_KEY, JSON.stringify({ user }));
    } else {
      window.localStorage.removeItem(this.USER_KEY);
      window.localStorage.removeItem(this.SESSION_KEY);
    }
    this.currentUser = user;
    
    // Notify listeners
    this.listeners.forEach(listener => {
      listener(user ? 'SIGNED_IN' : 'SIGNED_OUT', user ? { user } : null);
    });
  }

  async getSession() {
    if (typeof window === 'undefined' || !window.localStorage) {
      return { data: { session: null } };
    }
    
    const sessionJson = window.localStorage.getItem(this.SESSION_KEY);
    let session = null;
    
    if (sessionJson) {
      try {
        session = JSON.parse(sessionJson);
      } catch (e) {
        console.error('Failed to parse session from localStorage', e);
      }
    }
    
    return { data: { session } };
  }

  async getUser() {
    return { data: { user: this.currentUser } };
  }

  onAuthStateChange(callback: AuthChangeCallback) {
    this.listeners.push(callback);
    
    // Return an unsubscribe function
    return {
      data: {
        subscription: {
          unsubscribe: () => {
            this.listeners = this.listeners.filter(listener => listener !== callback);
          }
        }
      }
    };
  }

  async signInWithPassword({ email, password }: { email: string; password: string }) {
    // In a real app, you'd validate credentials against a server
    // For this local implementation, we'll simulate successful login if both fields are provided
    if (!email || !password) {
      return { error: { message: 'Email and password are required' } };
    }
    
    if (typeof window === 'undefined' || !window.localStorage) {
      return { error: { message: 'Browser localStorage not available' } };
    }
    
    // Check if user exists in localStorage (for sign in)
    const usersJson = window.localStorage.getItem('yungs_tech_users') || '[]';
    let users: User[] = [];
    
    try {
      users = JSON.parse(usersJson);
    } catch (e) {
      console.error('Failed to parse users from localStorage', e);
    }
    
    const user = users.find(u => u.email === email);
    
    if (!user) {
      return { error: { message: 'User not found' } };
    }
    
    // In a real app, you'd hash and compare passwords
    // This is just a simulation
    const user_id = user.id;
    
    this.saveUser(user);
    
    return { data: { user }, error: null };
  }

  async signUp({ email, password, options }: { 
    email: string; 
    password: string; 
    options?: { 
      data?: { 
        username: string;
        learning_speed: string;
        preferred_learning_style: string;
        daily_goal: number;
      } 
    } 
  }) {
    if (!email || !password) {
      return { error: { message: 'Email and password are required' } };
    }
    
    if (typeof window === 'undefined' || !window.localStorage) {
      return { error: { message: 'Browser localStorage not available' } };
    }
    
    // Get existing users or initialize empty array
    const usersJson = window.localStorage.getItem('yungs_tech_users') || '[]';
    let users: User[] = [];
    
    try {
      users = JSON.parse(usersJson);
    } catch (e) {
      console.error('Failed to parse users from localStorage', e);
    }
    
    // Check if user already exists
    if (users.some(user => user.email === email)) {
      return { error: { message: 'User already exists' } };
    }
    
    // Create new user
    const newUser: User = {
      id: `user_${Date.now()}`,
      email,
      username: options?.data?.username || '',
      user_metadata: options?.data
    };
    
    // Add to users array
    users.push(newUser);
    window.localStorage.setItem('yungs_tech_users', JSON.stringify(users));
    
    // Set as current user
    this.saveUser(newUser);
    
    return { data: { user: newUser }, error: null };
  }

  async signOut() {
    this.saveUser(null);
    return { error: null };
  }
}

// Analytics storage
interface AnalyticsEvent {
  event: string;
  data: any;
  user_id: string | undefined;
  timestamp: Date;
}

class LocalStorageDB {
  private tables: Record<string, any[]> = {};
  private readonly STORAGE_PREFIX = 'yungs_tech_db_';
  
  constructor() {
    // Defer loading tables until after initialization
    setTimeout(() => {
      this.loadTables();
    }, 0);
  }
  
  private loadTables() {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        console.warn('Browser localStorage not available');
        return;
      }
      
      // Load existing tables from localStorage
      for (let i = 0; i < window.localStorage.length; i++) {
        const key = window.localStorage.key(i);
        if (key && key.startsWith(this.STORAGE_PREFIX)) {
          const tableName = key.replace(this.STORAGE_PREFIX, '');
          try {
            this.tables[tableName] = JSON.parse(window.localStorage.getItem(key) || '[]');
          } catch (e) {
            console.error(`Failed to parse table ${tableName} from localStorage`, e);
            this.tables[tableName] = [];
          }
        }
      }
    } catch (e) {
      console.error('Error accessing localStorage in loadTables', e);
    }
  }
  
  private saveTable(tableName: string) {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        console.warn('Browser localStorage not available');
        return;
      }
      
      window.localStorage.setItem(
        `${this.STORAGE_PREFIX}${tableName}`, 
        JSON.stringify(this.tables[tableName] || [])
      );
    } catch (e) {
      console.error(`Error saving table ${tableName} to localStorage`, e);
    }
  }
  
  from(tableName: string) {
    // Initialize table if it doesn't exist
    if (!this.tables[tableName]) {
      this.tables[tableName] = [];
      this.saveTable(tableName);
    }
    
    return {
      insert: (items: any[]) => {
        this.tables[tableName] = [...this.tables[tableName], ...items];
        this.saveTable(tableName);
        return { error: null };
      },
      select: (columns: string = '*') => {
        return {
          data: this.tables[tableName],
          error: null
        };
      }
    };
  }
}

// Create instances - but make sure we're in a browser environment first
let auth: LocalStorageAuth | null = null;
let db: LocalStorageDB | null = null;

// We'll initialize these after the module has loaded
let isBrowser = false;

// Use a function to initialize everything to avoid accessing localStorage during module initialization
function initializeStorage() {
  // Check if we're in a browser environment before initializing
  isBrowser = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  
  if (isBrowser) {
    try {
      auth = new LocalStorageAuth();
      db = new LocalStorageDB();
    } catch (e) {
      console.error('Error initializing storage', e);
      auth = null;
      db = null;
    }
  } else {
    console.warn('LocalStorage is not available in this environment');
  }
}

// Defer initialization to next event loop
setTimeout(initializeStorage, 0);

// Export the storage client with the same interface as supabase
export const localStorageClient = {
  auth: {
    getSession: async () => {
      if (auth) return auth.getSession();
      return { data: { session: null } };
    },
    getUser: async () => {
      if (auth) return auth.getUser();
      return { data: { user: null } };
    },
    onAuthStateChange: (callback: AuthChangeCallback) => {
      if (auth) return auth.onAuthStateChange(callback);
      return { data: { subscription: { unsubscribe: () => {} } } };
    },
    signInWithPassword: async (params: { email: string; password: string }) => {
      if (auth) return auth.signInWithPassword(params);
      return { error: { message: 'Auth not initialized yet' } };
    },
    signUp: async (params: any) => {
      if (auth) return auth.signUp(params);
      return { error: { message: 'Auth not initialized yet' } };
    },
    signOut: async () => {
      if (auth) return auth.signOut();
      return { error: null };
    }
  },
  from: (tableName: string) => {
    return {
      insert: async (items: any[]) => {
        if (db) return db.from(tableName).insert(items);
        return { error: null };
      },
      select: (columns: string = '*') => {
        if (db) return db.from(tableName).select(columns);
        return { data: [], error: null };
      }
    };
  }
};

// Create mock implementations for non-browser environments
function createMockAuth() {
  return {
    getSession: async () => ({ data: { session: null } }),
    getUser: async () => ({ data: { user: null } }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signInWithPassword: async () => ({ error: { message: 'LocalStorage not available' } }),
    signUp: async () => ({ error: { message: 'LocalStorage not available' } }),
    signOut: async () => ({ error: null })
  };
}

function createMockDB() {
  return {
    from: () => ({
      insert: async () => ({ error: null }),
      select: async () => ({ data: [], error: null })
    })
  };
}

// Rate limiting helper (same as in supabase.ts)
const rateLimiter = new Map<string, number>();

export const checkRateLimit = (key: string, limit: number, windowMs: number = 60000): boolean => {
  const now = Date.now();
  const windowStart = now - windowMs;
  
  // Clean up old entries
  rateLimiter.forEach((timestamp, k) => {
    if (timestamp < windowStart) rateLimiter.delete(k);
  });
  
  // Check current count
  const count = Array.from(rateLimiter.entries())
    .filter(([k, t]) => k.startsWith(key) && t > windowStart)
    .length;
    
  if (count >= limit) return false;
  
  // Add new timestamp
  rateLimiter.set(`${key}_${now}`, now);
  return true;
};

// Analytics helper
export const logAnalytics = async (event: string, data: any) => {
  try {
    if (!db) {
      console.warn('Analytics: DB not initialized yet, event will be lost:', event);
      return;
    }
    
    let userId = null;
    if (auth) {
      userId = (await auth.getUser())?.data?.user?.id;
    }
    
    const { error } = await localStorage.from('analytics').insert([{
      event,
      data,
      user_id: userId,
      timestamp: new Date()
    }]);
      
    if (error) throw error;
  } catch (err) {
    console.error('Analytics error:', err);
  }
};