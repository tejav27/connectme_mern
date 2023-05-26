import "./rightbar.css";
import { useContext, useState, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import TextField from "@mui/material/TextField";

export default function EditProfile() {
  const { user, dispatch, token } = useContext(AuthContext);
  const [isEdit, setIsEdit] = useState(false);
  const about = useRef();
  const from = useRef();
  const city = useRef();
  const school = useRef();

  const handleProfileEdit = async () => {
    setIsEdit(true);
  };
  const handleSave = async () => {
    let updateFields = {
      desc: about.current.value,
      from: from.current.value,
      city: city.current.value,
      school: school.current.value,
      userId: user._id,
    };
    const formData = new FormData();
    formData.append("desc", about.current.value);
    formData.append("from", from.current.value);
    formData.append("city", city.current.value);
    formData.append("school", school.current.value);
    formData.append("userId", user._id);
    try {
      const response = await fetch(`/users/${user._id}`, {
        method: "PUT",
        body: JSON.stringify(updateFields),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: "UPDATEUSER", payload: data });
      } else {
        console.log("Some problem", response);
      }
    } catch (error) {
      console.log("Some problem server error", error);
    }
    setIsEdit(false);
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <button onClick={handleProfileEdit}>Edit Profile</button>
        <br />
        <br />
        <h4 className="rightbarTitle">About {user.username}</h4>
        <span className="rightbarInfoKey">
          Interests:
        </span>
        {isEdit ? (
          <TextField
            hiddenLabel
            id="filled-hidden-label-small"
            defaultValue={user.desc}
            variant="filled"
            size="small"
            inputRef={about}
          />
        ) : (
          <span className="rightbarInfoValue">{user.desc}</span>
        )}
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            {isEdit ? (
              <TextField
                hiddenLabel
                id="filled-hidden-label-small"
                defaultValue={user.city}
                variant="filled"
                size="small"
                inputRef={city}
              />
            ) : (
              <span className="rightbarInfoValue">{user.city}</span>
            )}
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            {isEdit ? (
              <TextField
                hiddenLabel
                id="filled-hidden-label-small"
                defaultValue={user.from}
                variant="filled"
                size="small"
                inputRef={from}
              />
            ) : (
              <span className="rightbarInfoValue">{user.from}</span>
            )}
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">School/Work:</span>
            {isEdit ? (
              <TextField
                hiddenLabel
                id="filled-hidden-label-small"
                defaultValue={user.school}
                variant="filled"
                size="small"
                inputRef={school}
              />
            ) : (
              <span className="rightbarInfoValue">{user.school}</span>
            )}
          </div>
          {isEdit ? (
            <div className="editButtons">
              {" "}
              <button onClick={() => setIsEdit(false)}>Back</button>{" "}
              <button onClick={handleSave}>Save</button>{" "}
            </div>
          ) : (
            <span />
          )}
        </div>
      </div>
    </div>
  );
}
