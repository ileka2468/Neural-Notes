import { useUser } from "reactfire";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


export const useRedirectIfNotLoggedIn = (pathToRedirect) => {
     const [isNotLoggedIn, setIsNotLoggedIn] = useState(null);
     const { status, data: user } = useUser();
     const navigateTo = useNavigate();

     useEffect(() => {
          if (!user && status === 'success') {
               setIsNotLoggedIn(true);
               navigateTo(`/${pathToRedirect}`)
          } else if (user && status === 'success') {
               setIsNotLoggedIn(false);
          }
     }, [user])

     return isNotLoggedIn;
}