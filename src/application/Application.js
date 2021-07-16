import React, { useEffect, useState } from 'react'


const MyApplication = (props) => {


    const [application, setApplication] = useState({})

    const getApplication = async () => {
        const url = 'http://localhost:5000/api/v1/applications/status'

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })

        const status = await response.status

        if (status === 200) {
            const data = await response.json()
            setApplication(data)
        }
        else {
            props.history.push('/dashboard')
        }

    }

    useEffect(() => {
        getApplication()
    }, [])

    return <div className='card text-center'>

        <h1>{application.status}</h1>
        <h1>{application.name}</h1>
        <h1>{application.occupation}</h1>
        <h1>{application.number}</h1>
        <h1>{application.address}</h1>
        <h1>{application.date.slice(0, 10)}</h1>
    </div>

}

export default MyApplication
