import jwtDecode from 'jwt-decode'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../app/authSlice'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let username = ''
    let role = ''
    if(token){
        const decoded = jwtDecode(token)
        username = decoded.UserInfo.username
        role = decoded.UserInfo.role
    }
    return {username: username, role: role}
}

export default useAuth