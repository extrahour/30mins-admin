import 'src/global.css';
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
import {useEffect, useState} from "react";
import {supabase} from "./supabaseClient";
import LoginPage from "./pages/login";


export default function App() {
  useScrollToTop();

  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return (
      <LoginPage/>
    );
  } else {
    return (
      <div>
        <ThemeProvider>
          <Router />
        </ThemeProvider>
      </div>
    );
  }
}
