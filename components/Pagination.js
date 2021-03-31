import React, { useState, useEffect } from 'react'

const fetchDatas = (limit, skip) => {
    const data = {}
    // Make sure you send 'limit' and 'skip' as query parameters to your node.js server
    fetch(`/api/submissions?limit=${limit}&skip=${skip}`) 
        .then((res) => {
            this.setState({
                data: res.data
            })
        })
};

export const Pagination = () => {

    const [limit, setLimit] = useState(5);
    const [skip, setSkip] = useState(0);

    const nextPage = () => {
        setSkip(skip + limit)
    }

    const previousPage = () => {
        setSkip(skip - limit)
    }

    useEffect(() => {
        fetchDatas(limit, skip)
    }, [skip, limit])


    return (
    <> 
        <div> 
            { 
                datas.map(val => 
                    <div> 
                        <span> { val.data.age } </span>
                        <span> { val.data.gender } </span>
                        <span> { val.data.education } </span>
                    </div>
                )
            }
        </div>
        <div> 
            <div onClick={nextPage}> Previous Page </div>
            <div onClick={previousPage}> Next Page </div> 
        </div>
    </>
    )
};