import { EuiFlexGroup, EuiForm ,EuiSpacer} from "@elastic/eui";
import React, { useState } from "react";
import MakingNameField from "../components/FormComponents/MakingNameField";
import MeetingUserField from "../components/FormComponents/MeetingUsersField";
import Header from "../components/Header"
import useFetchUsers from "../hooks/userFetchUsers";
import useAuth from "../hooks/useAuth";
import moment from "moment";
import MeetingDateField from "../components/FormComponents/MeetingDateField";
import CreateMeetingButtons from "../components/FormComponents/CreateMeetingButtons";
import { FieldErrorType, UserType } from "../utils/types";
import { meetingsRef } from "../utils/FirebaseConfig";
import { generateMeetingID } from "../utils/generateMeetingid";
import { addDoc } from "firebase/firestore";
import { useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";
import useToast from "../hooks/useToast";




export default function OneOnemeeting(){
  useAuth();
  const [users] = useFetchUsers();
  const [createToast] = useToast();
  const uid = useAppSelector((zoom)=> zoom.auth.userInfo?.uid)
  const navigate = useNavigate();
  const[meetingName,setMeetingName]=useState("")


  const [selectedUser, setSelectedUser] = useState<Array<UserType>>([]);
  const [startDate, setStartDate] = useState(moment());
  const [showErrors, setShowErrors] = useState<{
    meetingName: FieldErrorType;
    meetingUser: FieldErrorType;
  }>({
    meetingName: {
      show: false,
      message: [],
    },
    meetingUser: {
      show: false,
      message: [],
    },
  });


  const onUserChange = (selectedOptions:any) => {
    setSelectedUser(selectedOptions);
  };


  const validateForm = () => {
    const showErrorsClone = { ...showErrors };
    let errors = false;
    if (!meetingName.length) {
      showErrorsClone.meetingName.show = true;
      showErrorsClone.meetingName.message = ["Please Enter Meeting Name"];
      errors = true;
    } else {
      showErrorsClone.meetingName.show = false;
      showErrorsClone.meetingName.message = [];
    }
    if (!selectedUser.length) {
      showErrorsClone.meetingUser.show = true;
      showErrorsClone.meetingUser.message = ["Please Select a User"];
      errors = true;
    } else {
      showErrorsClone.meetingUser.show = false;
      showErrorsClone.meetingUser.message = [];
    }
    setShowErrors(showErrorsClone);
    return errors;
  };

const createMeeting =async ()=>{

  if (!validateForm()) {
    const meetingId = generateMeetingID();
    await addDoc(meetingsRef, {
      createdBy: uid,
      meetingId,
      meetingName,
      meetingType: "1-on-1",
      invitedUsers: [selectedUser[0].uid],
      meetingDate: startDate.format("L"),
      maxUsers: 1,
      status: true,
    });

    navigate("/")
    createToast({
      title: "One on One Meeting Created Successfully",
      type: "success",
    });
    // navigate("/");
  }

}





  return(
    <div 
    style={{
    display:"flex",
    height:"100vh",
    flexDirection:"column"}}>
      <Header/>
      <EuiFlexGroup justifyContent="center" alignItems="center">
        <EuiForm> 
         
          <MakingNameField
      
         label="Meeting Name"
         placeholder="Meeting Name please"
         value={meetingName}
         setMeetingName={setMeetingName}
         isInvalid={showErrors.meetingName.show}
         error={showErrors.meetingName.message}
         />

         <MeetingUserField
        
            label="Invite User"
              isInvalid={showErrors.meetingUser.show}
              error={showErrors.meetingUser.message}
            options={users}
            onChange={onUserChange}
            selectedOptions={selectedUser}
            singleSelection={{ asPlainText: true }}
            isClearable={false}
            placeholder="Select a User"  />

            <MeetingDateField selected={startDate} setStartDate={setStartDate} />
            <EuiSpacer />
            <CreateMeetingButtons createMeeting={createMeeting} />
        </EuiForm>
        
      </EuiFlexGroup>
    </div>
  )
}