import { createContext, useEffect, useState, useContext  } from 'react';

export const AuthContext = createContext({});

export const AuthProvider = (props) => { 

    const userStorage = localStorage.getItem("user");
    
    const [user, setUser] = useState({
        "id": null,
        "name": null,
        "membership": null,
        "token": null
    });
    
    useEffect(() => {
        
         
          
            
          if (userStorage) {

            setUser(JSON.parse(userStorage));
          } else {
            
            setUser({
                "id": null,
                "name": null,
                "membership": null,
                "token": null
            });
          }

    }, []);
    
    return(
        <AuthContext.Provider value ={{ user, setUser }}>
            {props.children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext);