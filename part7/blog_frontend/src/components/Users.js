import React from 'react'
import User from './User'

const Users = ({users}) => {
    return (
        <div>
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <td></td>
                        <td>blogs created</td>
                    </tr>
                    
                </thead>
                <tbody>
                    {users.map(user=>{
                        return (
                            <User key={user.id} user={user}/>
                        )
                    })
                    }
                </tbody>
                
            </table>
        </div>
    )
}

export default Users