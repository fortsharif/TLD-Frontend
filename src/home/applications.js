import React, { useState, useEffect, useRef } from 'react'
import { Redirect } from 'react-router-dom'

const url = 'http://localhost:5000/api/v1/applications'

const Application = () => {

    const [auth, setAuth] = useState(true)



    useEffect(() => {

        (async () => {
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': localStorage.getItem('token'),
                        //signal: controller.signal
                    }

                })

                if (response.status === 200) {
                    setAuth(true)
                }
                else {
                    setAuth(false)
                }

            }
            catch (e) {
                console.log(1)
            }
        })()

        /* return () => {
            controller?.abort()
        } */

    }, [auth])

    console.log(auth)

    if (auth) {
        return <>
            <h1>Helloooooo</h1>
        </>

    }

    return (
        <>
            <Redirect to="/login"></Redirect>
        </>
    )

}

export default Application