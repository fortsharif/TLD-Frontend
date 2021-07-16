import React, { useEffect, useState } from 'react'


const MyApplication = (props) => {


    const [application, setApplication] = useState({})
    const [loading, setLoading] = useState(true)
    const [image, setImage] = useState(null)



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
            console.log(data)
            setApplication(data)
            setLoading(false)
        }
        else {
            props.history.push('/dashboard')
        }

    }

    useEffect(() => {
        getApplication()
    }, [])

    return <div className='card text-center'>
        {/* <img src={process.env.PUBLIC_URL + '/noimage.png'} alt="" /> */}
        <h1>{application.status}</h1>
        <h1>{application.name}</h1>
        <h1>{application.occupation}</h1>
        <h1>{application.number}</h1>
        <h1>{application.address}</h1>
        {loading ? <h1>Loading...</h1> : <h1>{application.date.slice(0, 10)}</h1>}
    </div>

}

export default MyApplication
