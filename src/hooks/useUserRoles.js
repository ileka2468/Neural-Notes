import { useEffect, useState } from "react";
import { useAuth } from "reactfire";

export const useUserRole = () => {
     const auth = useAuth();
     const [userRole, setUserRole] = useState({ roleStatus: 'loading', userRole: null });

     async function getCustomClaimRole() {
          if (auth.currentUser) {
               // console.log("There is a user")
               await auth.currentUser.getIdToken(true);
               const decodedToken = await auth.currentUser.getIdTokenResult();
               const role = decodedToken.claims.stripeRole;
               setUserRole({ roleStatus: 'success', userRole: role })
          } else {
               setUserRole({ roleStatus: 'success', userRole: 'no user' })
          }
     }

     useEffect(() => {
          const unregister = auth.onAuthStateChanged(user =>
               getCustomClaimRole()
          )
          return () => unregister()
     }, []);

     return { ...userRole };
};

