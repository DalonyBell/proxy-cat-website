// auth.js
const SUPABASE_URL = 'https://vplhmlklptetvebtywhn.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwbGhtbGtscHRldHZlYnR5d2huIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExMDkyNDUsImV4cCI6MjA1NjY4NTI0NX0.oNXoqZ5TNRZAIoeta2cnL4FNNgfF4iDDwaQYu-JSoCI';// Use the anon public key

// Initialize the Supabase client
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Function to handle signup
async function signUp(email, password) {
  const { user, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });
  return { user, error };
}

// Function to handle login
async function logIn(email, password) {
  const { user, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  return { user, error };
}

// Function to check if user is logged in
async function isLoggedIn() {
  const { data } = await supabase.auth.getSession();
  return data.session !== null;
}

// Function to redirect if not logged in
async function requireAuth() {
  if (!await isLoggedIn()) {
    window.location.href = '/login.html';
  }
}