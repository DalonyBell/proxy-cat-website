// auth.js
const SUPABASE_URL = 'https://vplhmlklptetvebtywhn.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwbGhtbGtscHRldHZlYnR5d2huIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExMDkyNDUsImV4cCI6MjA1NjY4NTI0NX0.oNXoqZ5TNRZAIoeta2cnL4FNNgfF4iDDwaQYu-JSoCI';

// Initialize Supabase client correctly using the global object created by the CDN script
const supabase = supabaseClient.createClient(SUPABASE_URL, SUPABASE_KEY);

// Function to handle signup
async function signUp(email, password) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    return { user: data.user, error };
  } catch (err) {
    console.error("SignUp error:", err);
    return { user: null, error: err };
  }
}

// Function to handle login
async function logIn(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    return { user: data.user, error };
  } catch (err) {
    console.error("Login error:", err);
    return { user: null, error: err };
  }
}

// Function to check if user is logged in
async function isLoggedIn() {
  try {
    const { data } = await supabase.auth.getSession();
    return data.session !== null;
  } catch (err) {
    console.error("Session check error:", err);
    return false;
  }
}

// Function specifically for donation page - redirects to login if needed
async function requireDonateAuth() {
  if (!await isLoggedIn()) {
    // Store the intention to go to donate page
    localStorage.setItem('redirectAfterLogin', 'donate.html');
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

// Function to log out
async function logOut() {
  try {
    await supabase.auth.signOut();
    window.location.href = 'index.html';
  } catch (err) {
    console.error("Logout error:", err);
  }
}

// Function to get current user info
async function getCurrentUser() {
  try {
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      return data.session.user;
    }
    return null;
  } catch (err) {
    console.error("Get user error:", err);
    return null;
  }
}