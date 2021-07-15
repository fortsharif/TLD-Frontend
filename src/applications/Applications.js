import React, { useState, useEffect, useRef } from 'react'
import { Redirect } from 'react-router-dom'


const Applications = (props) => {


    /* const [admin, setAdmin] = useState(false) */
    const [url, setUrl] = useState('http://localhost:5000/api/v1/applications')
    const [applications, setApplications] = useState([])
    const [current, setCurrent] = useState(0)
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const token = localStorage.getItem('token')

    const getApplications = async (page) => {
        let url = `http://localhost:5000/api/v1/applications?page=${page}`
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        })
        const status = await response.status
        if (status === 401) {
            props.history.push('/dashboard')
        }

        const applications = await response.json()


        setTotal(() => applications.total_results)

        setCurrent(() => applications.current_item)
        setApplications(() => applications.applications)


        console.log(total)
        console.log(current)


    }



    useEffect(() => {

        getApplications(page)


    }, [page])


    return (
        <>
            <ul>
                {applications.map((application) => {
                    return <li key={application._id}>
                        <div>
                            {/* <h4>{application.id}</h4> */}
                            <h4>{application.name}</h4>
                            <h4>{application.occupation}</h4>
                            <h4>{application.address}</h4>
                            <h4>{application.number}</h4>
                            <h4>{application.date}</h4>
                            <h4>{application.status}</h4>
                        </div>

                    </li>
                })}
            </ul>
            {page > 0 ?
                <button type='button' onClick={() => {
                    setPage((page) => page - 1)
                    //getApplications(page)


                }}>Back</button> : <button type="button" disabled>Back</button>

            }
            {current - total <= 0 ?
                <button type='button' onClick={() => {
                    setPage((page) => page + 1)
                    //getApplications(page)


                }}>Next</button> : <button type="button" disabled>Next</button>
            }
        </>
    )

}

export default Applications