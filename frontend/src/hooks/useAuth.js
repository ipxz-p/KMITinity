import jwtDecode from 'jwt-decode'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../app/authSlice'
import { useGetUserQuery } from '../app/api/userApiSlice';

const useAuth = () => {
    const token = useSelector(selectCurrentToken) || ''
    let username = ''
    let email = ''
    let roles = ''
    let profileImgPath = ''
    let id = ''
    if (token) {
        const decoded = jwtDecode(token)
        username = decoded.UserInfo.username
        email = decoded.UserInfo.email
        roles = decoded.UserInfo.roles
    }
    const { user } = useGetUserQuery("usersList", {
        selectFromResult: ({ data }) => {
            if (data) {
                const userKeys = Object.keys(data.entities);
                for (let i = 0; i < userKeys.length; i++) {
                    const userProp = userKeys[i];
                    if (data.entities[userProp].email === email) {
                        return {
                            user: data.entities[userProp]
                        };
                    }
                }
            }
            return { user: null }; // หรือค่าเริ่มต้นที่ต้องการให้ถ้าไม่พบผู้ใช้
        }
    });
    if(user){
        profileImgPath = user?.profileImgPath
        localStorage.setItem("imgPath", JSON.stringify(profileImgPath))
        id = user?.id
    }
    return { username: username, email: email, roles: roles, profileImgPath: profileImgPath, id: id }
}

export default useAuth