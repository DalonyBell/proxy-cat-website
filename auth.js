// auth.js
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://vplhmlklptetvebtywhn.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

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

// Function to redirect if not logged in
async function requireAuth() {
  if (!await isLoggedIn()) {
    window.location.href = '/login.html';
  }
}

// Function to log out
async function logOut() {
  try {
    await supabase.auth.signOut();
    window.location.href = '/login.html';
  } catch (err) {
    console.error("Logout error:", err);
    return { error: err };
  }
}

console.log("Auth.js loaded successfully"); // Debugging line