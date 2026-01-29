import  { checkPropTypes } from "prop-types";

function UserProfile(props) {
  // eslint-disable-next-line react/forbid-foreign-prop-types
  checkPropTypes(UserProfile.propTypes, props, "prop", "UserProfile");

  const {name} = props;
  return (
    <div>
      <p>Name: {name}</p>
    </div>
  );
}

UserProfile.propTypes = {
  // Object + logic với name
  name: (props, propName, componentName) => {
    const value = props[propName];
    const nameRegex = /^[A-Za-z\s]+$/;
    
    if (typeof value !== "string") {
      return new Error(
        `Invalid prop '${propName}' in '${componentName}': must be a string`
      );
    }
    if (!value.trim()) {
        return new Error("Name cannot be empty");
    }
    if (!nameRegex.test(value)) {
      return new Error(
        `Invalid prop '${propName}' in '${componentName}': must contain only letters`
      );
    }
    return null;
  },
};

export default UserProfile;


// // Format email
//   email: (props, propName, componentName) => {
//   const value = props[propName];
//   const regex = /^[a-zA-Z]+(_\d+)?@gmail\.com$/;

//   if (!regex.test(value)) {
//     return new Error(
//       `Invalid prop '${propName}' in '${componentName}': email must be like abc_12@gmail.com`
//     );
//   }
//   return null;
// },