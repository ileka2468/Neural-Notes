import { useUser } from "reactfire";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


export const useRedirectIfLoggedIn = (pathToRedirect) => {
     const [isLoggedIn, setIsLoggedIn] = useState(null);
     const { status, data: user } = useUser();
     const navigateTo = useNavigate();

     useEffect(() => {
          if (user) {
               setIsLoggedIn(true)
               navigateTo(`/${pathToRedirect}`)
          } else {
               setIsLoggedIn(false);
          }
     }, [user])

     return [status, isLoggedIn];
}