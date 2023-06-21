import jwtDecode from 'jwt-decode'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../app/authSlice'

const useAuth = () => {
    const token = useSelector(selectCurrentToken) || ''
    let username = ''
    let email = ''
    let roles = ''
    let profileImgPath = ''
    if(token){
        const decoded = jwtDecode(token)
        username = decoded.UserInfo.username
        email = decoded.UserInfo.email
        roles = decoded.UserInfo.roles
        profileImgPath = decoded.UserInfo.profileImgPath
        localStorage.setItem("imgPath", JSON.stringify(profileImgPath))
    }
    return {username: username,email: email, roles: roles, profileImgPath: profileImgPath}
}

export default useAuth