import {
  EuiGlobalToastList,
  EuiProvider,
  EuiThemeProvider,
} from "@elastic/eui";
import "@elastic/eui/dist/eui_theme_light.css"
 import "@elastic/eui/dist/eui_theme_dark.css"
import { EuiThemeColorMode } from "@elastic/eui/src/services/theme";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
 import { useAppDispatch, useAppSelector } from "./app/hooks";
 import { setToasts } from "./app/slices/MeetingSlice";
 import ThemeSelector from "./components/ThemeSelector";
 import CreateMeeting from "./pages/CreateMeeting";
import Dashboard from "./pages/Dashboard";
 import JoinMeeting from "./pages/JoinMeeting";
 import Login from "./pages/Login";
 import Meeting from "./pages/Meeting";
import MyMeetings from "./pages/MyMeetings";
import OneOneMeeting from "./pages/OneOnemeeting";
import VideoConference from "./pages/VideoConference";

 export default function App() {
  const dispatch = useAppDispatch();
  const isDarkTheme = useAppSelector((zoom) => zoom.auth.isDarkTheme);
  const [isInitialEffect, setIsInitialEffect] = useState(true);
  const toasts = useAppSelector((zoom) => zoom.meetings.toasts);

  const removeToast = (removedToast: { id: string }) => {
    dispatch(
      setToasts(
        toasts.filter((toast: { id: string }) => toast.id !== removedToast.id)
      )
    );
  };
  const [theme, setTheme] = useState<EuiThemeColorMode>("light");
  useEffect(() => {
    const theme = localStorage.getItem("zoom-theme");
    if (theme) {
      setTheme(theme as EuiThemeColorMode);
    } else {
      localStorage.setItem("zoom-theme", "light");
    }
  }, []);

  useEffect(() => {
    if (isInitialEffect) setIsInitialEffect(false);
    else {
      window.location.reload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDarkTheme]);

  const overrides = {
    colors: {
      LIGHT: { primary: "#0b5cff" },
      DARK: { primary: "#0b5cff" },
    },
  };

  return (
    <ThemeSelector>
      <EuiProvider colorMode={theme}>
        <EuiThemeProvider modify={overrides}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<CreateMeeting />} />
            <Route path="/create1on1" element={<OneOneMeeting />} />
            <Route path="/videoconference" element={<VideoConference />} />
            <Route path="/mymeetings" element={<MyMeetings />} />
            <Route path="/meetings" element={<Meeting />} /> 
            <Route path="/join/:id" element={<JoinMeeting />} />
            
             
            <Route path="/" element={<Dashboard />} />
           <Route path="*" element={<Login />} />
          </Routes>
          <EuiGlobalToastList
             toasts={toasts}
            dismissToast={removeToast}
            toastLifeTimeMs={4000}
          />
        </EuiThemeProvider>
      </EuiProvider>
      </ThemeSelector>
   
  );
}
