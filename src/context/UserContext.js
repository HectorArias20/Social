import { createContext, useState } from 'react'
//import { onAuthStateChangedListener } from '../utils/Firebase/Firebase';



export const UserContext= createContext({
    currentUser:null,
    setCurrentUser:()=>null,

});

export const UserProvider= ({children})=>{
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));
    const value={currentUser,
        activeUser:(value)=>{
            if(value===null){
                setCurrentUser(null);
                localStorage.removeItem('user')
            }else{
                
                window.localStorage.setItem('user', JSON.stringify({id: value.id, firstName: value.firstName, lastName:value.lastName, isActive2FA: value.isActive2FA, email: value.email, phone:value.phone, token: value.token}));
                setCurrentUser(value);
            }
        }
        };
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}