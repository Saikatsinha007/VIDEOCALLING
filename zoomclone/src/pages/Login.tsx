import React from 'react'
import { EuiProvider,EuiFlexGroup,EuiText,EuiButton,EuiTextColor,EuiFlexItem,EuiImage,EuiPanel,EuiSpacer } from '@elastic/eui'
import animation from "../assets/animation.gif";
import zoomlogo from "../assets/zoomlogo.png";
import { GoogleAuthProvider,onAuthStateChanged, signInWithPopup, } from 'firebase/auth';
import { firebaseAuth, usersRef } from '../utils/FirebaseConfig';
import { collection, query, where, addDoc, getDocs } from "firebase/firestore";
import {  useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import {setUser} from "../app/slices/AuthSlice"
function Login() {

    const navigate=useNavigate()
    const dispatch=useAppDispatch();

    onAuthStateChanged(firebaseAuth,(currentUser)=>{
        if(currentUser) navigate("/")
    })

     const login=async()=>{
        const provider= new GoogleAuthProvider();
        const {user:{displayName,email,uid}}= await signInWithPopup(firebaseAuth,provider)
        if(email){
        const firestoreQuery= query(usersRef,where("uid","==",uid));
        const fetchedUsers= await getDocs(firestoreQuery)
        if(fetchedUsers.docs.length===0){
            await addDoc(usersRef,{
                uid,
                name:displayName,
                email,
            })
        }
        }
        dispatch(setUser({uid,name:displayName!,email:email!}))
        navigate("/")
        //console.log(data);
     }


  return (
    <EuiProvider colorMode='dark'>
        <EuiFlexGroup
        justifyContent="center"
        alignItems="center"
        style={{ width: "100vw", height: "100vh" }}
      >
        <EuiFlexItem grow={false}>
          <EuiPanel paddingSize="xl">
            <EuiFlexGroup justifyContent="center" alignItems="center">
              <EuiFlexItem>
                <EuiImage src={animation} alt="logo" />
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiImage src={zoomlogo} alt="logo" size="230px" />
                <EuiSpacer size="xs" />
                <EuiText textAlign="center" grow={false}>
                  <h3>
                    <EuiTextColor>One Platform to</EuiTextColor>
                    <EuiTextColor color="#0b5cff"> connect</EuiTextColor>
                  </h3>
                </EuiText>
                <EuiSpacer size="l" />
                <EuiButton fill  onClick={login}>
                  Login with Google 
                
                </EuiButton>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup> 
    </EuiProvider>
  )
}

export default Login